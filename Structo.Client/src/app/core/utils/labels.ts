// Display labels for server enum values, so the UI never shows raw values like "TenantOwner" or "FinancialFreeze".

const ROLE_LABELS: Record<string, { ar: string; en: string }> = {
  SuperAdmin: { ar: 'مدير المنصة', en: 'Platform admin' },
  PlatformOwner: { ar: 'مالك المنصة', en: 'Platform owner' },
  TenantOwner: { ar: 'مالك الشركة', en: 'Company owner' },
  Manager: { ar: 'مدير مشروع', en: 'Project manager' },
  Accountant: { ar: 'محاسب', en: 'Accountant' },
  SiteEngineer: { ar: 'مهندس موقع', en: 'Site engineer' },
  DesignEngineer: { ar: 'مهندس تصميم', en: 'Design engineer' },
};

const PROJECT_STATUS_LABELS: Record<string, { ar: string; en: string; tone: 'success' | 'warning' | 'muted' | 'info' }> = {
  Active: { ar: 'نشط', en: 'Active', tone: 'success' },
  FinancialFreeze: { ar: 'مجمّد مالياً', en: 'Financially frozen', tone: 'warning' },
  Frozen: { ar: 'مجمّد مالياً', en: 'Financially frozen', tone: 'warning' },
  Closed: { ar: 'مغلق', en: 'Closed', tone: 'muted' },
  Completed: { ar: 'مكتمل', en: 'Completed', tone: 'info' },
  OnHold: { ar: 'متوقف', en: 'On hold', tone: 'warning' },
};

const PROPERTY_TYPE_LABELS: Record<string, { ar: string; en: string }> = {
  Residential: { ar: 'سكني', en: 'Residential' },
  Apartment: { ar: 'شقة', en: 'Apartment' },
  Villa: { ar: 'فيلا', en: 'Villa' },
  Duplex: { ar: 'دوبلكس', en: 'Duplex' },
  Commercial: { ar: 'تجاري', en: 'Commercial' },
  Administrative: { ar: 'إداري', en: 'Administrative' },
  Office: { ar: 'مكتب', en: 'Office' },
  Medical: { ar: 'طبي', en: 'Medical' },
  Retail: { ar: 'محل تجاري', en: 'Retail' },
  Industrial: { ar: 'صناعي', en: 'Industrial' },
  Hospitality: { ar: 'فندقي', en: 'Hospitality' },
};

const pick = (map: Record<string, { ar: string; en: string }>, key: string | null | undefined, lang: string) => {
  if (!key) return '';
  const entry = map[key] ?? Object.entries(map).find(([k]) => k.toLowerCase() === key.toLowerCase())?.[1];
  return entry ? (lang === 'en' ? entry.en : entry.ar) : key;
};

export const roleLabel = (role: string | null | undefined, lang = 'ar') => pick(ROLE_LABELS, role, lang);
export const propertyTypeLabel = (type: string | null | undefined, lang = 'ar') => pick(PROPERTY_TYPE_LABELS, type, lang);
export const projectStatusLabel = (status: string | null | undefined, lang = 'ar') => pick(PROJECT_STATUS_LABELS, status, lang);
export const projectStatusTone = (status: string | null | undefined) =>
  (status && (PROJECT_STATUS_LABELS[status] ?? Object.entries(PROJECT_STATUS_LABELS).find(([k]) => k.toLowerCase() === status.toLowerCase())?.[1])?.tone) || 'muted';
