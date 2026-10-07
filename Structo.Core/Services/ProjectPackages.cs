using System;
using System.Collections.Generic;
using System.Linq;

namespace Structo.Core.Services;

/// <summary>
/// The single server-side price list for extra-project packages (EGP, 0% VAT).
/// Used by the plans endpoint, Paymob checkout and InstaPay requests; never taken from the client.
/// </summary>
public static class ProjectPackages
{
    public sealed record Package(string Type, int Projects, decimal PriceEgp);

    public static readonly Package PlusOne = new("PLUS_1", 1, 250m);
    public static readonly Package PlusFive = new("PLUS_5", 5, 950m);

    public static readonly IReadOnlyList<Package> All = [PlusOne, PlusFive];

    public static Package? Find(string? type) =>
        All.FirstOrDefault(p => string.Equals(p.Type, type?.Trim(), StringComparison.OrdinalIgnoreCase));

    public static Package? ForProjects(int projects) => All.FirstOrDefault(p => p.Projects == projects);
}
