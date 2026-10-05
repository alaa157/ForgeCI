# ForgeCI

Self-hosted, production-style CI/CD and test-intelligence platform.

## Phases 1–3 (current)

- Monorepo foundation, Spring Boot backend, Next.js frontend
- Local infrastructure: PostgreSQL, Redis, RabbitMQ, MinIO, Prometheus, Grafana
- Flyway migrations, health endpoints, RFC 7807 error responses, request-id logging
- Auth: register / login / refresh-token rotation (Argon2 + JWT)
- Organizations, repository connections, GitHub OAuth (encrypted tokens at rest)

## Prerequisites

Git, GNU Make, Java 21, Maven 3.9+, Node.js 20+, npm 10+, Docker Engine + Compose v2.

## Quick start

```bash
cp .env.example .env
# set FORGECI_JWT_SECRET, FORGECI_ENCRYPTION_KEY, GITHUB_* as needed
make help
make infra-up
make backend-test
make frontend-check
```

### Key endpoints

| Method | Path | Notes |
|--------|------|-------|
| GET | `/api/v1/health` | App health + version |
| GET | `/actuator/health` | Liveness / readiness / deps |
| GET | `/actuator/prometheus` | Metrics |
| POST | `/api/v1/auth/register` | Create account |
| POST | `/api/v1/auth/login` | Access + refresh tokens |
| POST | `/api/v1/auth/refresh` | Rotate refresh token |
| POST | `/api/v1/organizations` | Create org (caller becomes OWNER) |
| GET | `/api/v1/organizations/{id}/connections/github/authorize` | Start GitHub OAuth |
| GET | `/api/v1/connections/github/callback` | OAuth callback (fixed redirect URI) |
| GET | `/api/v1/organizations/{id}/repositories/available` | List GitHub repos for connect UI |
| POST | `/api/v1/organizations/{id}/repositories` | Connect repo by external id |

Register the GitHub OAuth App callback exactly as:

`http://localhost:8080/api/v1/connections/github/callback`
