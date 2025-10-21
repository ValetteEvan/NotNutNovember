# 🔒 PRIVACY POLICY

**No Nut November Challenge - Chrome Extension**

*Last updated: October 2024*

---

## 📋 Introduction

This privacy policy describes how the "No Nut November Challenge" extension collects, uses, and protects your personal data.

**TL;DR:** We collect NO personal data. Everything stays on your device.

---

## 🔐 Data Collection

### Data we DO NOT collect:

- ❌ No personally identifiable information
- ❌ No browsing history
- ❌ No account information
- ❌ No email addresses
- ❌ No IP addresses
- ❌ No location data
- ❌ No analytics data
- ❌ No telemetry data
- ❌ No cookies
- ❌ No financial information

### Data stored LOCALLY on your device:

The extension stores the following information **only on your computer** using Chrome's `chrome.storage.local` API:

1. **Challenge Progress**
   - Dates marked as "success" or "failed"
   - Consecutive days count (streak)
   - Unlocked badges

2. **User Preferences**
   - Site blocking enabled/disabled
   - Notifications enabled/disabled
   - Dark mode (future feature)

3. **Custom Websites**
   - List of websites you chose to block
   - **Note:** This list remains private and local

4. **Timestamps**
   - Challenge start date

**Important:** This data NEVER leaves your device. It is not sent to external servers or shared with third parties.

---

## 🌐 Data Transmission

### No external transmission

- ✅ **No connections** to external servers
- ✅ **No tracking** or analytics
- ✅ **No third-party services** integrated
- ✅ **No external APIs** used (except local Chrome APIs)

### Network Communication

The extension makes **NO network requests** to external servers.

The only network operations are:
- **Local blocking** of websites (handled by Chrome locally)
- **Redirection** to a local HTML page within the extension

**No data is transmitted** during these operations.

---

## 🔒 Data Storage

### Local storage only

All data is stored in Chrome's local storage (`chrome.storage.local`), which:

- ✅ Stays on your computer
- ✅ Is only accessible by the extension
- ✅ Is not synced to other devices
- ✅ Can be deleted at any time by you

### Storage Location

Data is stored in your Chrome profile directory:
- **Windows:** `%LOCALAPPDATA%\Google\Chrome\User Data\Default\`
- **macOS:** `~/Library/Application Support/Google/Chrome/Default/`
- **Linux:** `~/.config/google-chrome/Default/`

### Retention Period

Data is kept **as long as you keep the extension installed**.

You can:
- Delete all data via the extension's Settings
- Uninstall the extension (all data will be automatically deleted)

---

## 🛡️ Data Security

### Protection

Your data is protected by:

1. **Local storage only** - No server = no risk of external hacking
2. **Browser isolation** - Chrome protects extension data
3. **Limited permissions** - The extension only requests necessary permissions
4. **Open source code** - You can verify the code on GitHub

### No encryption needed for transmission

Since **no data is transmitted**, there's no need for network encryption.

Locally stored data benefits from OS and browser protection.

---

## 🔑 Permissions Used

The extension requests the following permissions and here's why:

### 1. `storage`
- **Why:** Save your progress, settings, and blocked sites **locally**
- **Data:** Validated days, badges, preferences
- **Where:** Only on your device

### 2. `declarativeNetRequest`
- **Why:** Block access to adult websites
- **Data:** List of domains to block
- **Where:** Local processing by Chrome

### 3. `declarativeNetRequestWithHostAccess`
- **Why:** Redirect to a motivational page when a site is blocked
- **Data:** No personal data
- **Where:** Local redirection

### 4. `notifications`
- **Why:** Display daily reminders (optional)
- **Data:** Predefined motivational messages
- **Where:** Local system notifications

### 5. `alarms`
- **Why:** Schedule daily reminders at 9 PM
- **Data:** Timestamp only
- **Where:** Chrome's local alarm system

### 6. `<all_urls>` (host permissions)
- **Why:** Necessary to block websites across all domains
- **Data:** No collection, only blocking
- **Where:** Local processing

**Important:** Despite the `<all_urls>` permission, the extension does **NOT read** web page content and does **NOT collect** your browsing history.

---

## 👤 Your Rights

### Data Access

You can at any time:

1. **View your data**
   - Open browser console (F12)
   - Execute: `chrome.storage.local.get(null, console.log)`

2. **Export your data**
   - Settings → "Export data (JSON)"
   - File downloaded to your computer

3. **Delete your data**
   - Settings → "Reset challenge"
   - Or: Settings → "Delete all data"
   - Or: Uninstall the extension

### No request needed

Since all data is on **your device**, you have full control. No third-party request is necessary.

---

## 🔄 Anonymous Sharing Code

### "Accountability" Feature

The extension allows generating a "sharing code" to prove your progress anonymously.

**How it works:**

1. You click "Generate sharing code"
2. A code is created **locally** based on your statistics
3. Format: `NNN-2024-ABC12-15D12S`
   - `NNN-2024`: Challenge identifier
   - `ABC12`: Non-reversible hash
   - `15D`: 15 days validated
   - `12S`: 12-day streak

**What is shared:**
- ✅ Public statistics (validated days, streak)
- ✅ Anonymous hash (impossible to identify you)

**What is NOT shared:**
- ❌ Your identity
- ❌ Sites you blocked
- ❌ Specific dates
- ❌ Any personal information

The code is generated **locally** and no data is sent online. It's simply text you can copy and share manually.

---

## 🌍 Blocked Websites

### Default List

The extension includes a list of 37+ adult sites blocked by default.

**This list is:**
- ✅ Stored in the extension code
- ✅ Public and viewable in the source code
- ✅ Identical for all users

### Custom Sites

You can add your own sites to block.

**These custom sites:**
- ✅ Stay on your device
- ✅ Are never shared
- ✅ Are not visible to the developer
- ✅ Can be deleted at any time

**Important:** We have no way of knowing which sites you personally block.

---

## 🔗 Third-Party Services

### No third-party services used

The extension uses **NO external services**:

- ❌ No Google Analytics
- ❌ No advertising tracking
- ❌ No cloud database
- ❌ No crash reporting service
- ❌ No external CDN
- ❌ No third-party API

**100% autonomous and local.**

---

## 🆔 Anonymous Data and Telemetry

### No telemetry

The extension collects **NO anonymous data** or telemetry.

We don't know:
- How many people use the extension
- How the extension is used
- If errors occur
- Which features are popular

**Everything happens on your computer, period.**

---

## 👶 Children

The extension is designed to help with self-control and can be used by people of all ages.

**No children's data is collected** because no data is collected at all.

Parents can supervise usage by checking locally stored data if needed.

---

## 🔄 Changes to This Policy

### Change Notifications

If this privacy policy changes:

1. The "Last updated" date will be modified
2. Changes will be documented in release notes
3. The new policy will be included in extension updates

### Commitment

We commit to **always keep the extension 100% local** and without data collection.

If this were to change (which is not planned), we would:
- Clearly inform you
- Ask for your explicit consent
- Allow you to easily opt out

---

## 📞 Contact

### Privacy Questions

If you have questions about this privacy policy:

- **GitHub Issues:** [Your GitHub repo URL]
- **Email:** [Your email]

### GDPR Requests

Although the extension doesn't collect any personal data, you can:

- Request a copy of your data (it's on your device)
- Request deletion (uninstall the extension)
- Request clarifications (contact us)

---

## ⚖️ Legal Basis (GDPR)

### GDPR Compliance

The extension is compliant with the **General Data Protection Regulation (GDPR)** because:

1. **No data collection** - No processing of personal data
2. **Total transparency** - Open source code
3. **User control** - You manage all your data locally
4. **Data minimization** - Only necessary data is stored locally
5. **Security** - Protected local storage

### No consent required

No consent is needed for cookies or tracking because **the extension uses neither cookies nor tracking**.

---

## 📜 Summary in Simple Language

**In one sentence:**
Everything stays on your computer, nothing is sent anywhere, ever.

**What the extension does:**
- ✅ Saves your progress locally
- ✅ Blocks sites locally
- ✅ Sends you local notifications

**What the extension does NOT do:**
- ❌ Spy on your activity
- ❌ Collect data
- ❌ Track you
- ❌ Share anything with anyone

**You keep full control.**

---

## 🏷️ License

This extension is distributed under the **MIT License** - see the LICENSE file for details.

The source code is publicly available on GitHub and can be audited by anyone.

---

## ✅ Verification

To verify that the extension respects this policy:

1. **Check the source code** on GitHub
2. **Inspect network requests** (DevTools → Network): no external requests
3. **Verify permissions** in chrome://extensions/
4. **Read the code** - everything is open source

---

**This privacy policy is effective as of October 2024.**

*If you have any privacy concerns, please don't hesitate to contact us.*

---

🔒 **Your privacy is our priority.**

---

*Developed with respect for your privacy* 💜
