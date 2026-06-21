namespace Structo.Core.DTOs.Tenants;

public class TenantProfileUpdateDto
{
    public string Name { get; set; } = string.Empty;
    public string LogoUrl { get; set; } = string.Empty;
    public string BannerUrl { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
    public string CompanyDescription { get; set; } = string.Empty;
}
