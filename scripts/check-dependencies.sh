#!/bin/bash
# Script to check for dependency issues in the project

echo "================================================"
echo "Dependency Analysis for TALIA Project"
echo "================================================"
echo ""

echo "1. Checking for node-domexception dependency chain:"
echo "---------------------------------------------------"
npm why node-domexception
echo ""

echo "2. Checking for deprecated packages:"
echo "-----------------------------------"
npm ls --depth=0 2>&1 | grep -i "deprecated" || echo "No deprecated direct dependencies found"
echo ""

echo "3. Running security audit:"
echo "-------------------------"
npm audit
echo ""

echo "================================================"
echo "Analysis complete. See DEPENDENCY_ANALYSIS.md"
echo "and SECURITY_NOTES.md for detailed information."
echo "================================================"
