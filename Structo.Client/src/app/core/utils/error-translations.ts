export const ERROR_TRANSLATIONS: Record<string, string> = {
  'ACCOUNT_DEACTIVATED': 'تم تعطيل هذا الحساب. يرجى التواصل مع إدارة النظام.',
  'AUTH.ACCOUNT_DEACTIVATED': 'تم تعطيل هذا الحساب. يرجى التواصل مع إدارة النظام.',
  'REFRESH_TOKEN_EXPIRED': 'انتهت فترة الجلسة. يرجى تسجيل الدخول مجدداً.',
  'AUTH.REFRESH_TOKEN_EXPIRED': 'انتهت فترة الجلسة. يرجى تسجيل الدخول مجدداً.',
  'INVALID_REFRESH_TOKEN': 'رمز التجديد غير صالح أو تم استخدامه سابقاً.',
  'AUTH.INVALID_REFRESH_TOKEN': 'رمز التجديد غير صالح أو تم استخدامه سابقاً.',
  'INVALID_CREDENTIALS': 'اسم المستخدم أو كلمة المرور غير صحيحة.',
  'AUTH.INVALID_CREDENTIALS': 'اسم المستخدم أو كلمة المرور غير صحيحة.'
};

/**
 * Extracts the error message returned from the API server:
 * `const apiMessage = err.error?.message || err.message;`
 */
export function extractApiMessage(err: any): string {
  if (!err) return '';
  return (
    err.error?.message ||
    err.error?.Message ||
    (typeof err.error === 'string' ? err.error : '') ||
    err.message ||
    err.Message ||
    (typeof err === 'string' ? err : '')
  );
}

/**
 * Maps an API error code or string to its translated Arabic text if available.
 */
export function translateErrorMessage(rawMsg: string): string {
  if (!rawMsg) return '';
  const trimmed = rawMsg.trim();
  return ERROR_TRANSLATIONS[trimmed] || rawMsg;
}
