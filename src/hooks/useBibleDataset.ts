import { useEffect, useState } from "react";
import { bibleService } from "../services/bibleService";

export function useBibleDataset() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let active = true;
    bibleService.loadFullDataset()
      .then(() => {
        if (!active) return;
        setVersion((current) => current + 1);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setError("Non riesco a caricare il testo biblico completo.");
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { loading, error, version };
}
