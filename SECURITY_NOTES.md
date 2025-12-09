# Security Notes

## Critical Vulnerabilities

### Next.js RCE Vulnerability (CVE-2025-66478)

**Severity**: Critical (CVSS Score: 10.0)

**Current Version**: 15.5.4
**Fixed In**: 15.5.7+

**Description**: Next.js is vulnerable to Remote Code Execution (RCE) in React flight protocol.

**Impact**: 
- Attack Vector: Network (AV:N)
- Attack Complexity: Low (AC:L)
- Privileges Required: None (PR:N)
- User Interaction: None (UI:N)
- Scope: Changed (S:C)
- Confidentiality: High (C:H)
- Integrity: High (I:H)
- Availability: High (A:H)

**Affected Versions**: 15.5.0 - 15.5.6

### Recommendation

**IMMEDIATE ACTION REQUIRED**: Update Next.js to version 15.5.7 or later:

```bash
npm install next@15.5.7
```

Or update package.json:
```json
{
  "dependencies": {
    "next": "15.5.7"
  }
}
```

Then run:
```bash
npm install
```

### References

- [GitHub Advisory](https://github.com/advisories/GHSA-9qr9-h5gf-34mp)
- [Next.js Blog Post](https://nextjs.org/blog/CVE-2025-66478)
- [CWE-502: Deserialization of Untrusted Data](https://cwe.mitre.org/data/definitions/502.html)

## Deprecated Dependencies

See [DEPENDENCY_ANALYSIS.md](./DEPENDENCY_ANALYSIS.md) for information about deprecated dependencies like `node-domexception`.
