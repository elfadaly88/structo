# Structo: Ultimate Role-Based Feature Matrix & System Test Suite

This document outlines the **Role-Based Feature Access Matrix** and the comprehensive **Integration Test Suite** for Structo's Financial, Closeout, and Platform Onboarding modules.

---

## 👥 Part 1: User Role Feature Access Matrix

Structo implements strict multi-tenant row-level isolation and role-based claim authorization to protect corporate financial integrity and prevent data leakage.

| Feature Area | SuperAdmin | TenantOwner (صاحب المكتب) | Accountant (المحاسب) | Site Engineer (مهندس الموقع) |
| :--- | :---: | :---: | :---: | :---: |
| **System & Tenant Maintenance** | ✅ Full Access | ❌ Forbidden | ❌ Forbidden | ❌ Forbidden |
| **Tenant Metrics & Counts** | ✅ Access | ✅ Own Tenant Only | ✅ Own Tenant Only | ❌ Forbidden |
| **Project Financial Summaries** | ❌ Forbidden | ✅ Full Access | ✅ Full Access | ❌ Forbidden |
| **Individual Invoices & Receipts** | ❌ Forbidden | ✅ Full Access | ✅ Full Access | ❌ Forbidden |
| **Direct Disbursements / Payouts** | ❌ Forbidden | ✅ Full Access | ❌ Read Only | ❌ Forbidden |
| **Reconciliation Reports & Drill-downs**| ❌ Forbidden | ✅ Full Access | ✅ Full Access | ❌ Forbidden |
| **Reimbursement Approval & Payout** | ❌ Forbidden | ✅ Full Access | ✅ Full Access | ❌ Forbidden |
| **Confirm Refund / Cash Recovery** | ❌ Forbidden | ✅ Full Access | ✅ Full Access | ❌ Forbidden |
| **Financial Freeze Trigger** | ❌ Forbidden | ✅ Full Access | ✅ Full Access | ❌ Forbidden |
| **Final Closeout Execution** | ❌ Forbidden | ✅ Full Access | ❌ Read Only | ❌ Forbidden |
| **"My Custody / عهدي" Dashboard** | ❌ Forbidden | ✅ Read Only | ✅ Read Only | ✅ Full Access |
| **Submit Multi-line Drafts** | ❌ Forbidden | ✅ Full Access | ❌ Read Only | ✅ Full Access |
| **Upload Invoice Receipts** | ❌ Forbidden | ✅ Full Access | ❌ Read Only | ✅ Full Access |
| **WhatsApp Clearing Reminders** | ❌ Forbidden | ✅ Trigger Only | ✅ Trigger Only | 📩 Receives Notifications |

---

## 🧪 Part 2: Master Integration Test Suite

### 📋 Test Case 1: Partial Settlement Reconcile Loop

#### Purpose
Verify that if a Site Engineer receives a custody advance and settles only a portion of the amount, the custody record status remains active, and remaining custody dynamic calculations reflect the correct outstanding balance.

#### Test Execution Steps
1. **Login** as a Site Engineer (e.g. `adam.mostafa.els@gmail.com`).
2. **Submit Custody Advance Request** for `15,000 EGP`.
3. **Login** as a TenantOwner/Accountant and **Approve & Disburse** the custody request.
4. **Login** as the Site Engineer. Notice the advance shows under "My Custody" as `Issued` (Open).
5. **Create Settlement Draft** against this advance with one line:
   * **Category:** "Cement"
   * **Amount:** `3,000 EGP`
   * **Invoice Attachment:** Upload a receipt image.
6. **Submit Settlement** for review.
7. **Login** as Accountant.
8. **Inspect Settlement:** Approve the settlement line of `3,000 EGP`.
9. **Check PettyCash State:**
   * **Expected Status:** `Issued` (remains open for further settlements).
   * **Expected Remaining Balance:** `12,000 EGP` outstanding custody liability on the engineer.

---

### 📋 Test Case 2: Confirm Refund Treasury Recovery

#### Purpose
Verify that when an engineer returns unused custody cash to the main treasury, the Accountant's confirmation triggers correct cash pool updates and registers an audit trail transaction.

#### Test Execution Steps
1. **Prepare State:** Ensure the project has an open PettyCash advance with an outstanding balance of `12,000 EGP` (from Test Case 1).
2. **Login** as the Site Engineer.
3. **Submit Final Settlement** declaring a cash return of `12,000 EGP` (net difference).
4. **Login** as the Accountant.
5. **Open Closeout Dashboard:** Click on the **Pending Treasury Refunds** card.
6. **Click "Confirm Refund":** Confirm the receipt of `12,000 EGP` in cash.
7. **Verify Main Treasury Pool:**
   * **Expected Balance:** The main cash pool balance increases by `12,000 EGP`.
   * **Expected Transaction:** A new credit transaction of type `RefundToTreasury` is created for `12,000 EGP`.
   * **Expected PettyCash Status:** Transitions to `Settled` with `IsSettled = true`.

---

### 📋 Test Case 3: Actionable Closeout Drill-Down Integrity

#### Purpose
Verify that the Final Closeout dashboard blocks closeout and displays warning validations as long as any employee balance or custody is outstanding.

#### Test Execution Steps
1. **Prepare State:** Have a project in `FinancialFreeze` state with one engineer holding `2,000 EGP` in open custody.
2. **Login** as TenantOwner.
3. **Navigate to Closeout Tab:**
   * **Expected State:** The red **Final Closeout** button is strictly **disabled**.
   * **Expected Validation Message:** *"لا يمكن الإغلاق — يوجد عهد معلَّقة أو أرصدة موظفين غير صفرية"* is displayed.
4. **Click "Unsettled Custody" Card:** Toggles details of the outstanding `2,000 EGP` advance.
5. **Click "WhatsApp Reminder":** Opens WhatsApp with the dynamic reminder text.
6. **Execute Settlement & Approvals:** Complete the settlement process to reconcile the employee balance to `0.00 EGP`.
7. **Verify Dashboard Re-evaluation:**
   * **Expected State:** The validation message changes to *"جميع الأرصدة مصفَّاة — المشروع جاهز للإغلاق النهائي"*.
   * **Expected Button State:** The **Final Closeout** button is instantly **enabled**.

---

### 📋 Test Case 4: Onboarding Role Verification & Password Strength

#### Purpose
Verify that form validation rules dynamically toggle based on `AccountType` during registration, and enforce password complexity rules.

#### Test Execution Steps
1. **Navigate to `/register`**.
2. **Select Account Type: "Company"**:
   * **Expected Fields:** Commercial Register and Tax Card inputs are visible.
   * **Validation Behavior:** These fields are optional for later dashboard completion.
3. **Select Account Type: "Freelancer"**:
   * **Expected Fields:** National ID and Syndicate ID inputs are visible.
   * **Validation Behavior:** These fields are 100% optional (all validation requirements and regex checks for National ID are removed for registration flexibility).
4. **Input Weak Password** (e.g. `123456`):
   * **Expected Strength Meter:** Displays red `Weak / ضعيف`.
   * **Expected Button State:** Submit button remains disabled.
5. **Input Strong Password** (e.g. `P@ssw0rd2026!`):
   * **Expected Strength Meter:** Displays emerald green `Strong / قوي`.
   * **Expected Button State:** Submit button becomes enabled once all other validations pass.
6. **Submit Form:**
   * **Expected Result:** Payload sends correctly, matches `TenantRegisterDto`, and registers successfully on the backend.

---

### 📋 Test Case 5: Platform Suspension & Tenant Locking

#### Purpose
Verify that when a SuperAdmin suspends a tenant, any user of that company is strictly denied login capabilities and token generation.

#### Test Execution Steps
1. **Login** as SuperAdmin.
2. **Navigate to Tenants Panel** (`/dashboard/tenants` or `/superadmin/dashboard`).
3. **Click "Suspend"** next to the target company.
4. **Logout** from SuperAdmin session.
5. **Attempt to Login** with any user account belonging to that company.
6. **Expected Result**: Login fails, displaying: `"⚠️ تم تعليق حساب شركتكم مؤقتًا؛ يرجى مراجعة إدارة المنصة لتجديد الاشتراك."`
7. **Login** as SuperAdmin, navigate back, and click **"Activate"** to restore account access.

---

### 📋 Test Case 6: Enriched Project Creation & Mapping

#### Purpose
Verify that new project site metadata (Location, Address, Client WhatsApp, and Property Type) is mapped correctly during creation and displayed accurately on the Project details page.

#### Test Execution Steps
1. **Login** as TenantOwner.
2. **Open the Project Creation Modal**.
3. **Fill in all fields**, selecting a Governorate (e.g., *Cairo*), City/Zone (e.g., *Fifth Settlement*), Site Address (e.g., *North 90 Street*), Client WhatsApp (e.g., *+201020304050*), and Property Type (e.g., *Administrative*).
4. **Submit project**.
5. **Navigate to the newly created project's workspace details page**.
6. **Expected Result**: 
   - The location badge (`📍 Cairo - Fifth Settlement`) displays in the header.
   - The property type badge (`🏢 Administrative`) displays alongside it.
   - The exact physical site address shows clearly next to them.

---

### 📋 Test Case 7: Google Maps Selector & Profile Completeness Alert

#### Purpose
Verify that registration accepts Google Maps address metadata, and dynamic warnings display for incomplete profiles.

#### Test Execution Steps
1. **Navigate to `/register`**.
2. **Click "📍 Map / الخريطة"** trigger button to open the map selector modal.
3. **Click "Drop Pin & Confirm"** (which drops a simulated marker, resolves address, coordinates and updates form controls).
4. **Fill in basic required credentials** (leaving tax card/national ID blank) and complete registration.
5. **Log in** with the registered user profile.
6. **Expected Result**: 
   - An amber warning strip is displayed persistently at the top of the screen: *"⚠️ حسابك مفعل ومقبول، ولكن يرجى استكمال باقي بياناتك القانونية والعنوان على الخريطة لتجنب تعليق الحساب مستقبلاً."*
   - The warning stays visible until all legal fields (NationalId or TaxCard) are filled out.
