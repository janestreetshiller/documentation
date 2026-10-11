# Worked assembly example: Ouros Gateway quickstart

This example shows how to use the skill against an existing guide without changing product behavior. It is a source-level assembly review, not a claim that native onboarding, API execution or hosted documentation has passed.

## Task and authority

The reader wants to check the Gateway, determine whether their signed-in account can create a session, and continue to the session guide. The inspected `quickstart.mdx` also contains Mac onboarding, so the reader must choose the API section explicitly. Website implementation and service contracts own API behavior; the documentation importer reads the website's guide JSON and plan source.

The documentation repository's `scripts/sync-from-website.mjs` imports `documentation/docs-app-guides.json`, `documentation/docs-gateway-guides.json` and `site/pricing.mjs` from the website checkout. It overwrites MDX and `docs.json`. A future prose change should begin in the authoritative guide JSON and regenerate intentionally, or explicitly migrate ownership before treating MDX as independent source.

## Page contract

| Question | Assembly choice |
| --- | --- |
| First action | Run the documented read-only health request in a terminal. |
| Observable result | Inspect HTTP status, content type and the documented JSON body. |
| What this proves | The health endpoint responded; it does not establish inference readiness. |
| Next starting state | Sign in on the Ouros website, then inspect account access in the playground. |
| Execution origin | Same-origin browser-session code runs on the signed-in Ouros website, not on a Mintlify documentation origin. |
| Permission boundary | Continue only using the account's actual service flags and runtime availability. |
| Failure route | Read status/error information and follow authentication, errors or troubleshooting guides. |
| Continuation | Session creation, inspection, streaming and cancellation belong in the Session API guide. |

## Comparisons that shaped the assembly

- E01 FastAPI supports putting a small action and observable response before deeper concepts.
- E07 GitHub supports explaining status, headers and response body together.
- E16 Notion supports naming the execution environment and credential boundary explicitly; its browser-token policy is not transferred.
- E08 Cloudflare and E24 Cloud Run support keeping separate readiness stages separate rather than implying one success establishes the next.
- E17 Linear supports inspecting generated-file ownership before making prose changes.
- E11 Mintlify supports checking an assigned hosted project origin before switching documentation traffic.

## Source-level observations

The existing guide names the terminal health request and expected response, explains what the response proves, identifies the signed-in origin for the account example, names the service flag needed to create a chat session, and links authentication, session and error guides. Explicit heading IDs preserve a path directly to the API section.

A future task could split the combined Mac/API quickstart if the reader's navigation requires it, but that requires a deliberate route/fragment plan rather than an incidental rewrite. The skill does not automatically authorize that restructuring.

The source review can check that navigation resolves, the MDX compiles and the examples retain their context. Live API results require the actual service and account state. Published deep links and search require the configured Mintlify origin. Native installation and first-action behavior require the native consumer. Do not substitute a passing source check for any of these outcomes.
