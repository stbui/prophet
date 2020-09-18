|                                  |     | React Query                         | SWR (Website)              | Apollo Client (Website)               |
| :------------------------------- | :-- | :---------------------------------- | :------------------------- | :------------------------------------ |
| Supported Query Syntax           |     | Promise, REST, GraphQL              | Promise, REST, GraphQL     | GraphQL                               |
| Supported Query Keys             |     | JSON                                | JSON                       | GraphQL Query                         |
| Query Key Change Detection       |     | Deep Compare (Stable Serialization) | Referential Equality (===) | Deep Compare (Unstable Serialization) |
| Query Data Memoization Level     |     | Query + Structural Sharing          | Query                      | Query + Entity + Structural Sharing   |
| Bundle Size                      |     | 6.8kb                               | 4.7kb                      | 32.9kb                                |
| Queries                          |     | ✅                                  | ✅                         | ✅                                    |
| Caching                          |     | ✅                                  | ✅                         | ✅                                    |
| Devtools                         |     | ✅                                  | 🟡                         | ✅                                    |
| Polling/Intervals                |     | ✅                                  | ✅                         | ✅                                    |
| Parallel Queries                 |     | ✅                                  | ✅                         | ✅                                    |
| Dependent Queries                |     | ✅                                  | ✅                         | ✅                                    |
| Paginated Queries                |     | ✅                                  | ✅                         | ✅                                    |
| Infinite Queries                 |     | ✅                                  | ✅                         | ✅                                    |
| Lagged / "Lazy" Queries          |     | ✅                                  | 🛑                         | 🛑                                    |
| Initial Data                     |     | ✅                                  | ✅                         | ✅                                    |
| Scroll Recovery                  |     | ✅                                  | ✅                         | ✅                                    |
| Cache Manipulation               |     | ✅                                  | ✅                         | ✅                                    |
| Outdated Query Dismissal         |     | ✅                                  | ✅                         | ✅                                    |
| Render Optimization              |     | ✅                                  | 🛑                         | 🛑                                    |
| Auto Garbage Collection          |     | ✅                                  | 🛑                         | 🛑                                    |
| Mutation Hooks                   |     | ✅                                  | 🟡                         | ✅                                    |
| Prefetching APIs                 |     | ✅                                  | 🔶                         | ✅                                    |
| Query Cancellation               |     | ✅                                  | 🛑                         | 🛑                                    |
| Partial Query Matching           |     | ✅                                  | 🛑                         | 🛑                                    |
| Stale While Revalidate           |     | ✅                                  | ✅                         | 🛑                                    |
| Stale Time Configuration         |     | ✅                                  | 🛑                         | 🛑                                    |
| Window Focus Refetching          |     | ✅                                  | ✅                         | 🛑                                    |
| Network Status Refetching        |     | ✅                                  | ✅                         | ✅                                    |
| Automatic Refetch after Mutation |     | 🔶                                  | 🔶                         | ✅                                    |
| Cache Dehydration/Rehydration    |     | ✅                                  | 🛑                         | ✅                                    |
| React Suspense (Experimental)    |     | ✅                                  | ✅                         | 🛑                                    |
