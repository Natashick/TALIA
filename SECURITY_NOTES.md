# Security Notes

## Security Status

✅ **All known vulnerabilities have been addressed**

Last security audit: 0 vulnerabilities found

---

## Previously Addressed Vulnerabilities

### Next.js RCE Vulnerability (CVE-2025-66478) - ✅ FIXED

**Severity**: Critical (CVSS Score: 10.0)

**Previous Version**: 15.5.4
**Current Version**: 15.5.9 ✅
**Fixed In**: 15.5.7+

**Description**: Next.js was vulnerable to Remote Code Execution (RCE) in React flight protocol.

**Impact**: 
- Attack Vector: Network (AV:N)
- Attack Complexity: Low (AC:L)
- Privileges Required: None (PR:N)
- User Interaction: None (UI:N)
- Scope: Changed (S:C)
- Confidentiality: High (C:H)
- Integrity: High (I:H)
- Availability: High (A:H)

**Affected Versions**: Multiple version ranges including 15.5.0 - 15.5.6

**Resolution Date**: 2025-12-09
**Action Taken**: Updated Next.js from 15.5.4 to 15.5.7

### Next.js Server Actions Source Code Exposure (GHSA-w37m-7fhw-fmv9) - ✅ FIXED

**Severity**: Moderate (CVSS Score: 5.3)

**Previous Version**: 15.5.7
**Current Version**: 15.5.9 ✅
**Fixed In**: 15.5.8+

**Description**: Next.js was vulnerable to Server Actions source code exposure.

**Impact**: 
- Attack Vector: Network (AV:N)
- Attack Complexity: Low (AC:L)
- Privileges Required: None (PR:N)
- User Interaction: None (UI:N)
- Scope: Unchanged (S:U)
- Confidentiality: Low (C:L)
- Integrity: None (I:N)
- Availability: None (A:N)

**Affected Versions**: 15.5.1-canary.0 - 15.5.7

**Resolution Date**: 2026-01-14
**Action Taken**: Updated Next.js from 15.5.7 to 15.5.9

**CWE**: 
- CWE-497: Exposure of Sensitive System Information
- CWE-502: Deserialization of Untrusted Data
- CWE-1395: Dependency on Vulnerable Third-Party Component

### Next.js Denial of Service with Server Components (GHSA-mwv6-3258-q52c) - ✅ FIXED

**Severity**: High (CVSS Score: 7.5)

**Previous Version**: 15.5.7
**Current Version**: 15.5.9 ✅
**Fixed In**: 15.5.8+

**Description**: Next.js was vulnerable to Denial of Service attacks when using Server Components.

**Impact**: 
- Attack Vector: Network (AV:N)
- Attack Complexity: Low (AC:L)
- Privileges Required: None (PR:N)
- User Interaction: None (UI:N)
- Scope: Unchanged (S:U)
- Confidentiality: None (C:N)
- Integrity: None (I:N)
- Availability: High (A:H)

**Affected Versions**: 15.5.1-canary.0 - 15.5.7

**Resolution Date**: 2026-01-14
**Action Taken**: Updated Next.js from 15.5.7 to 15.5.9

**CWE**: 
- CWE-400: Uncontrolled Resource Consumption
- CWE-502: Deserialization of Untrusted Data
- CWE-1395: Dependency on Vulnerable Third-Party Component

### References

- [GitHub Advisory GHSA-9qr9-h5gf-34mp](https://github.com/advisories/GHSA-9qr9-h5gf-34mp) - RCE Vulnerability
- [GitHub Advisory GHSA-w37m-7fhw-fmv9](https://github.com/advisories/GHSA-w37m-7fhw-fmv9) - Source Code Exposure
- [GitHub Advisory GHSA-mwv6-3258-q52c](https://github.com/advisories/GHSA-mwv6-3258-q52c) - Denial of Service
- [Next.js Blog Post](https://nextjs.org/blog/CVE-2025-66478)
- [CWE-502: Deserialization of Untrusted Data](https://cwe.mitre.org/data/definitions/502.html)
- [CWE-497: Exposure of Sensitive System Information](https://cwe.mitre.org/data/definitions/497.html)
- [CWE-400: Uncontrolled Resource Consumption](https://cwe.mitre.org/data/definitions/400.html)
- [CWE-1395: Dependency on Vulnerable Third-Party Component](https://cwe.mitre.org/data/definitions/1395.html)

## Deprecated Dependencies

See [DEPENDENCY_ANALYSIS.md](./DEPENDENCY_ANALYSIS.md) for information about deprecated dependencies like `node-domexception`.
