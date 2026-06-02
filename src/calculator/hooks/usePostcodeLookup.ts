import { useState, useCallback } from 'preact/hooks';

interface PostcodeResult {
  valid: boolean;
  latitude?: number;
  longitude?: number;
  error?: string;
}

export function usePostcodeLookup() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PostcodeResult | null>(null);

  const lookup = useCallback(async (postcode: string) => {
    const cleaned = postcode.trim().replace(/\s+/g, '');
    if (cleaned.length < 5) {
      setResult({ valid: false, error: 'Postcode too short' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.postcodes.io/postcodes/${encodeURIComponent(cleaned)}`,
      );
      const data = await res.json();

      if (data.status === 200 && data.result) {
        setResult({
          valid: true,
          latitude: data.result.latitude,
          longitude: data.result.longitude,
        });
      } else {
        setResult({ valid: false, error: 'Postcode not found' });
      }
    } catch {
      setResult({ valid: false, error: 'Unable to verify postcode' });
    } finally {
      setLoading(false);
    }
  }, []);

  return { lookup, loading, result };
}
