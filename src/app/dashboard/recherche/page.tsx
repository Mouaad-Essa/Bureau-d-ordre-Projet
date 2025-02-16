"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/src/components/ui/dialog";

type SearchResult = {
    sender: string;
    receiver: string;
    date: string;
    status: string;
    objet: string;
    numero?: string; // For Arrivées
    numOrdre?: string; // For Départs
};

const Page = () => {
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

    const handleSearch = async () => {
        try {
            const response = await fetch(
                `/api/search?type=${searchParams.type}&fromDate=${searchParams.fromDate}&toDate=${searchParams.toDate}&etablissement=${searchParams.etablissement}&objet=${searchParams.objet}`
            );
            const data = await response.json();

            if (data.error) {
                console.error(data.error);
                return;
            }

            if (searchParams.type === "Arrivées") {
                setResult({
                    sender: data[0].expediteur?.nom || "Unknown",
                    receiver: data[0].traitePar?.nom || "Unknown",
                    date: new Date(data[0].dateArv).toLocaleDateString(),
                    status: "Vu",
                    objet: data[0].objet,
                    numero: data[0].numero,
                });
            } else if (searchParams.type === "Départs") {
                setResult({
                    sender: data[0].signePar?.nom || "Unknown",
                    receiver: data[0].destination?.nom || "Unknown",
                    date: new Date(data[0].dateDepart).toLocaleDateString(),
                    status: "Envoyé",
                    objet: data[0].objet,
                    numOrdre: data[0].numOrdre,
                });
            }

            setDialogOpen(true);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Recherche des Arrivées et Départs</h1>
            <Card>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4 py-4">
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
                    <Button variant="default" className="bg-sky-500" onClick={handleSearch}>
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
                            <p>
                                <strong>De :</strong> {result.sender}
                            </p>
                            <p>
                                <strong>À :</strong> {result.receiver}
                            </p>
                            <p>
                                <strong>Envoyé le :</strong> {result.date}
                            </p>
                            <p>
                                <strong>Objet :</strong> {result.objet}
                            </p>
                            {result.numero && (
                                <p>
                                    <strong>Numéro :</strong> {result.numero}
                                </p>
                            )}
                            {result.numOrdre && (
                                <p>
                                    <strong>Numéro d&#39;Ordre :</strong> {result.numOrdre}
                                </p>
                            )}
                            <p>
                                <strong>Statut :</strong> {result.status}
                            </p>
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

export default Page;