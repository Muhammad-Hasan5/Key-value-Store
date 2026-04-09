# Key-Value Store (Node.js + TypeScript)

A simple in-memory key-value store I built to understand how systems like Redis actually work under the hood.

This started as a basic Map wrapper, but I kept adding pieces like persistence, TTL, and compaction to explore real database design problems.

---

## What it does

At a high level, it supports:

* Fast in-memory reads/writes
* Persistence using a write-ahead log (WAL)
* Periodic snapshots to avoid unbounded log growth
* Key expiration with TTL
* Two ways to interact: HTTP and raw TCP

---

## Why I built this

I wanted to go beyond using databases and actually understand:

* how data survives crashes
* how logs and snapshots work together
* what tradeoffs systems make for performance vs durability
* how TTL is handled efficiently at scale

This project is basically me trying to rebuild those ideas from scratch.

---

## Architecture (roughly)

```
Client
  ↓
HTTP / TCP
  ↓
Command parsing
  ↓
In-memory store (Map)
  ↓
WAL (batched writes)
  ↓
Disk
```

Background tasks:

* snapshot + compaction
* TTL cleanup

Nothing fancy, but enough to surface real problems.

---

## Core pieces

### In-memory store

Everything lives in a JavaScript `Map`.

Reads are straight from memory, so they’re fast.
Writes update memory first, then get logged.

---

### Write-Ahead Log (WAL)

Every write is appended to a log before being considered “done”.

Example:

```json
{"method":"PUT","key":"name","value":"ali","expiresAt":1710000000000}
```

To keep it fast, I batch writes instead of flushing every operation.

Tradeoff:

* better performance
* small risk of data loss if the process crashes before flush

---

### Snapshots + Compaction

If I only keep appending to the WAL, it grows forever.

So periodically:

1. I write the full in-memory state to a snapshot
2. clear the WAL

This makes restarts much faster since I don’t need to replay everything.

Downside:

* snapshotting is expensive
* I currently pause writes during it (not ideal)

---

### TTL (expiration)

Keys can expire.

Instead of scanning everything, I use:

* a map for expiration timestamps
* a min-heap to track the next key to expire

So cleanup is roughly `O(log n)` instead of `O(n)`.

---

### Interfaces

#### HTTP

```
PUT /store
GET /store/:key
DELETE /store/:key
```

#### TCP

```
SET key value [ttl]
GET key
DEL key
```

TCP version is very basic right now (no proper buffering yet).

---

## How data flows

### Write

```
client → memory → WAL (queued) → disk (batched)
```

### Read

```
client → memory → response
```

### Recovery

On restart:

1. load snapshot
2. replay WAL
3. rebuild state

---

## Tradeoffs I made

### WAL batching

* fewer disk writes
  – possible data loss window

---

### Snapshots

* faster recovery
  – expensive and currently blocking

---

### TTL with heap

* efficient expiration
  – extra memory + complexity

---

## Known limitations

This is not production-ready. Things are still missing:

* no replication (single node only)
* no strong durability guarantees (no fsync control)
* minimal error handling
* no concurrency control
* TCP protocol is very naive
* snapshot process blocks writes

---

## Things I’d improve next

* safer WAL (fsync / durability modes)
* non-blocking snapshots
* replication (leader/follower)
* better protocol (Redis-style or binary)
* memory limits + eviction policies
* proper benchmarking

---

## Running it

```bash
npm install
npm run build
npm start
```

---

## Final thoughts

This project helped me understand that databases are mostly about tradeoffs:

* speed vs safety
* memory vs disk
* simplicity vs correctness

There’s still a lot missing, but building even this much made the design of real systems a lot clearer.
