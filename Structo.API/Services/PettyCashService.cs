using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.PettyCash;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Core.Exceptions;
using Structo.Core.Interfaces;
using Structo.Infrastructure.Data;
using System;
using System.Threading.Tasks;

namespace Structo.API.Services;

public class PettyCashService(StructoDbContext context) : IPettyCashService
{
    public async Task<bool> SettlePettyCashAsync(Guid projectId, Guid pettyCashId, PettyCashSettleDto dto)
    {
        var pettyCash = await context.PettyCashes
            .FirstOrDefaultAsync(p => p.Id == pettyCashId && p.ProjectId == projectId);

        if (pettyCash == null)
            throw new BusinessRuleException("Petty cash record not found.");

        if (pettyCash.IsSettled)
            throw new BusinessRuleException("This petty cash has already been settled.");

        if (dto.SpentAmount > pettyCash.Amount)
            throw new BusinessRuleException("Spent amount cannot exceed the issued petty cash amount.");

        // Mark as settled
        pettyCash.IsSettled = true;
        pettyCash.Status = "Settled";
        pettyCash.SpentAmount = dto.SpentAmount;
        pettyCash.ReturnAmount = pettyCash.Amount - dto.SpentAmount;
        pettyCash.ReceiptPhotoUrl = dto.ReceiptPhotoUrl ?? string.Empty;
        pettyCash.SettlementPaymentMethod = dto.SettlementPaymentMethod;
        pettyCash.ExpenseDate = dto.ExpenseDate;

        // Generate Financial Transaction
        if (dto.SpentAmount > 0)
        {
            var expense = new FinancialTransaction
            {
                ProjectId = projectId,
                TenantId = pettyCash.TenantId,
                Type = TransactionType.Expense,
                Amount = dto.SpentAmount,
                Description = $"Petty Cash Settlement - {dto.ReceiptDescription}",
                PaymentMethod = dto.SettlementPaymentMethod,
                TransactionDate = dto.ExpenseDate,
                PaymentDate = dto.ExpenseDate,
                ReceiptPhotoUrl = dto.ReceiptPhotoUrl
            };
            
            context.FinancialTransactions.Add(expense);
        }

        await context.SaveChangesAsync();
        return true;
    }
}
