# Agentwerke V-model pilot

A deliberately small order-pricing service, here to prove **one** V-model thread end to end against
real systems — see [agentwerke-private#210](https://github.com/isartor-ai/agentwerke-private/issues/210).

This repository is the pilot's target, not a product. It exists so a single requirement can be traced
through a real CI run to a real test result:

> one requirement (an issue here) → one implementation → one real CI run → one real callback →
> one traceability row whose ids resolve to records in this repository

## The thread

1. An Agentwerke run is started with a `requirement_id` pointing at an issue in this repository.
2. `github.read_issue` reads it — the requirement is what the issue says, not an agent's paraphrase.
3. An agent implements the change in a sandbox and adds tests for it.
4. `cicd.trigger_deploy` dispatches `.github/workflows/agentwerke-verify.yml`, passing a correlation
   key (the Agentwerke run id).
5. The workflow runs `npm test`, then posts the JUnit report back to Agentwerke's signed event
   ingress, echoing the correlation key. **That callback is what resumes the run** — no operator
   calls `resume-external`.
6. Agentwerke parses the report and renders a traceability row linking the issue, the test, the CI
   run, and the stored report.

## Setup

The workflow needs two repository secrets:

| Secret | Value |
| --- | --- |
| `AGENTWERKE_INGRESS_URL` | `https://<agentwerke-host>/webhooks/events` — reachable from GitHub runners |
| `AGENTWERKE_INGRESS_SECRET` | shared secret matching the `ci` source in `Integrations:EventIngress:Sources` |

The Agentwerke instance must also have `Integrations:GitHub:RepositoryOwner=isartor-ai` and
`RepositoryName=agentwerke-vmodel-pilot` — the connector targets a single repository.

## Tests

```bash
npm ci
npm test
```

The CI workflow adds `--reporter=junit`, which is what Agentwerke ingests.
