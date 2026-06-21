using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Structo.Core.DTOs.Common;
using System.Linq;

namespace Structo.API.Filters;

public class ValidationFilterAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        if (!context.ModelState.IsValid)
        {
            var errors = context.ModelState.Values.Where(v => v.Errors.Count > 0)
                    .SelectMany(v => v.Errors)
                    .Select(v => v.ErrorMessage)
                    .ToList();

            var responseObj = new ApiResponse<object>
            {
                Success = false,
                Message = "Validation failed.",
                Errors = errors
            };

            context.Result = new BadRequestObjectResult(responseObj);
        }
    }
}
