#!/usr/bin/env python3
"""Pull the live CMS content (pages, posts, menus, site settings) out of the
Lovable Cloud database and store it as tools/cms-snapshot.json.

The WordPress export generator reads that snapshot so the exported site matches
exactly what is live on the React site.

Usage:  python3 fetch-cms-snapshot.py
"""

import json
import os
import urllib.request
from pathlib import Path

BASE = os.environ.get("VITE_SUPABASE_URL", "https://xubtapdevwwxwkeaybrb.supabase.co").rstrip("/")
KEY = os.environ.get(
    "VITE_SUPABASE_PUBLISHABLE_KEY", "sb_publishable_BewpBTyB-DrH8arRh_5Awg_NlFfIQQN"
)
TABLES = ["pages", "posts", "menu_items", "site_settings", "slides"]


def fetch(table):
    req = urllib.request.Request(
        f"{BASE}/rest/v1/{table}?select=*",
        headers={"apikey": KEY, "Authorization": f"Bearer {KEY}"},
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode())


def main():
    data = {t: fetch(t) for t in TABLES}
    out = Path(__file__).parent / "cms-snapshot.json"
    out.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    print("wrote", out, {k: len(v) for k, v in data.items()})


if __name__ == "__main__":
    main()
