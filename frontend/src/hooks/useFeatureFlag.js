import { useMemo } from 'react';

/**
 * PUBLIC_INTERFACE
 * useFeatureFlag reads REACT_APP_FEATURE_FLAGS and REACT_APP_EXPERIMENTS_ENABLED to check flags.
 * Accepts JSON ({"flag": true}) or CSV ("flag1,flag2").
 */
export default function useFeatureFlag(flag) {
  // Allow envs to be undefined
  const flags = useMemo(() => {
    const src = process.env.REACT_APP_FEATURE_FLAGS || '';
    if (!src) return {};
    try {
      const parsed = JSON.parse(src);
      if (parsed && typeof parsed === 'object') return parsed;
    } catch {
      // CSV fallback
      const map = {};
      src.split(',').map(s => s.trim()).filter(Boolean).forEach((k) => { map[k] = true; });
      return map;
    }
    return {};
  }, []);

  const experiments = useMemo(() => {
    const raw = process.env.REACT_APP_EXPERIMENTS_ENABLED || '';
    if (!raw) return new Set();
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return new Set(parsed);
    } catch {
      return new Set(raw.split(',').map(s => s.trim()).filter(Boolean));
    }
    return new Set();
  }, []);

  return !!(flags[flag] || experiments.has(flag));
}
