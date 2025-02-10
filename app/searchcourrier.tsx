import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

type SearchResult = {
  sender: string;
  receiver: string;
  date: string;
  status: string;
};

const SearchCourrier = () => {
  const [searchParams, setSearchParams] = useState({
    type: "Arrivées",
    fromDate: "",
    toDate: "",
    etablissement: "",
    objet: "",
  });
  const [result, setResult] = useState<SearchResult | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (field: keyof typeof searchParams, value: string) => {
    setSearchParams((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    setResult({
      sender: "Université X",
      receiver: "president ",
      date: "10/02/2025",
      status: "Vu",
    });
    setDialogOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recherche des arrivées et des départs</h1>
      <Card>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium">Type</label>
              <select
                value={searchParams.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="Arrivées">Arrivées</option>
                <option value="Départs">Départs</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">De</label>
              <Input
                type="date"
                value={searchParams.fromDate}
                onChange={(e) => handleChange("fromDate", e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">À</label>
              <Input
                type="date"
                value={searchParams.toDate}
                onChange={(e) => handleChange("toDate", e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Établissement</label>
              <Input
                type="text"
                placeholder="Sélectionner l'expéditeur"
                value={searchParams.etablissement}
                onChange={(e) => handleChange("etablissement", e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-1 font-medium">Objet</label>
              <Input
                type="text"
                placeholder="Rechercher par objet"
                value={searchParams.objet}
                onChange={(e) => handleChange("objet", e.target.value)}
              />
            </div>
          </div>
          <Button variant="default" onClick={handleSearch}>
            Rechercher
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Statut du Courrier</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <p><strong>de:</strong> {result.sender}</p>
              <p><strong>à:</strong> {result.receiver}</p>
              <p><strong>envoyé le:</strong> {result.date}</p>
              <p><strong>Lu:</strong> {result.status}</p>
            </div>
            <DialogFooter>
              <Button variant="default" onClick={() => setDialogOpen(false)}>
                Fermer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default SearchCourrier;
