
# Gloog Security Specification

## 1. API Authentication
- Raspberry Pi will authenticate using a device-specific bearer token.
- Dashboard users will use the authentication system agreed with the backend team.
- The backend will reject invalid or missing tokens.

## 2. Encryption in Transit
- All production API communication must use HTTPS/TLS.
- HTTP is permitted only for local development.

## 3. Bluetooth Security
- Check BLE pairing and link encryption for the XIAO ESP32-C3.
- Confirm the configuration before transmitting health data.

## 4. Encryption at Rest
- Review Supabase encryption features.
- Protect sensitive HR and vitals data.
- Apply access controls and avoid unnecessary storage of raw health data.

## 5. Secret Management
- Store secrets in environment variables or secure secret storage.
- Add .env to .gitignore.
- Never commit API keys or tokens to Git.

## 6. Pending Work
- Coordinate authentication with Darshit.
- Add token rotation and revocation.
- Integrate the approved database.
- Verify HTTPS/TLS and BLE security.
- Test security before deployment.

## Status
Initial prototype tested locally.
Production security review and backend integration are pending.
