import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // Create Roles
    const adminRole = await prisma.role.create({
        data: {
            nom: 'Admin',
            description: 'Administrator role with full access',
        },
    });

    // Create Privileges
    const privileges = await Promise.all(
        ['create', 'read', 'update', 'delete'].map((nom) =>
            prisma.privilege.create({
                data: { nom },
            })
        )
    );

    // Assign Privileges to Admin Role
    await Promise.all(
        privileges.map((privilege) =>
            prisma.role_Privilege.create({
                data: {
                    idRole: adminRole.id,
                    idPrv: privilege.id,
                },
                select: { idRole: true, idPrv: true },
            })
        )
    );

    // Create Services
    const services = await Promise.all(
        Array.from({ length: 10 }, (_, i) =>
            prisma.service.create({
                data: {
                    nom: `Service ${i + 1}`,
                    description: `Description for Service ${i + 1}`,
                },
            })
        )
    );

    // Create Utilisateurs
    const utilisateurs = await Promise.all(
        Array.from({ length: 10 }, (_, i) =>
            prisma.utilisateur.create({
                data: {
                    nom: `User${i + 1}`,
                    prenom: `Lastname${i + 1}`,
                    email: `user${i + 1}@example.com`,
                    password: `password${i + 1}`,
                    roleId: adminRole.id,
                    serviceId: services[i % services.length].id,
                },
            })
        )
    );

    // Create Etablissements
    const etablissements = await Promise.all(
        Array.from({ length: 10 }, (_, i) =>
            prisma.etablissement.create({
                data: {
                    nom: `Etablissement ${i + 1}`,
                    fax: `123-456-${i + 1}`,
                    adresse: `Address ${i + 1}`,
                    ville: `City ${i + 1}`,
                    contact: `Contact ${i + 1}`,
                },
            })
        )
    );

    // Create Poles
    const poles = await Promise.all(
        Array.from({ length: 10 }, (_, i) =>
            prisma.pole.create({
                data: {
                    nom: `Pole ${i + 1}`,
                    description: `Description for Pole ${i + 1}`,
                },
            })
        )
    );

    // Create Divisions
    const divisions = await Promise.all(
        Array.from({ length: 10 }, (_, i) =>
            prisma.division.create({
                data: {
                    nom: `Division ${i + 1}`,
                    description: `Description for Division ${i + 1}`,
                    poleId: poles[i % poles.length].id,
                },
            })
        )
    );

    // Assign Divisions to Services
    await Promise.all(
        services.map((service, i) =>
            prisma.service.update({
                where: { id: service.id },
                data: {
                    divisionId: divisions[i % divisions.length].id,
                },
            })
        )
    );

    // Create Courriers
    const courriers = await Promise.all(
        Array.from({ length: 10 }, (_, i) =>
            prisma.courrier.create({
                data: {
                    id: `courrier-${i + 1}`,
                },
            })
        )
    );

    // Create Arrivees
    const arrivees = await Promise.all(
        Array.from({ length: 10 }, (_, i) =>
            prisma.arrivee.create({
                data: {
                    idOrdre: `ORDRE-${i + 1}`,
                    dateArv: new Date(),
                    dateOrigin: new Date(),
                    expediteurId: etablissements[i % etablissements.length].id,
                    objet: `Objet ${i + 1}`,
                    numero: `NUM-${i + 1}`,
                    nbrFichier: i + 1,
                    typeSupport: `Support ${i + 1}`,
                    typeCourrier: `Type ${i + 1}`,
                    traiteParId: utilisateurs[i % utilisateurs.length].id,
                    courrierId: courriers[i % courriers.length].id,
                },
            })
        )
    );

    // Create Departs
    const departs = await Promise.all(
        Array.from({ length: 10 }, (_, i) =>
            prisma.depart.create({
                data: {
                    numOrdre: `ORDRE-${i + 1}`,
                    dateDepart: new Date(),
                    objet: `Objet ${i + 1}`,
                    destinationId: etablissements[i % etablissements.length].id,
                    nbrFichier: i + 1,
                    signeParId: utilisateurs[i % utilisateurs.length].id,
                    traiteParId: utilisateurs[(i + 1) % utilisateurs.length].id,
                    courrierId: courriers[i % courriers.length].id,
                },
            })
        )
    );

    // Create Fichiers
    const fichiers = await Promise.all(
        Array.from({ length: 10 }, (_, i) =>
            prisma.fichier.create({
                data: {
                    nom: `Fichier ${i + 1}`,
                    url: `http://example.com/fichier-${i + 1}`,
                    dateAjout: new Date(),
                    idDepart: departs[i % departs.length].id,
                    idArrivee: arrivees[i % arrivees.length].id,
                },
            })
        )
    );

    // Create Envois
    const envois = await Promise.all(
        Array.from({ length: 10 }, (_, i) =>
            prisma.envoi.create({
                data: {
                    expediteurId: utilisateurs[i % utilisateurs.length].id,
                    destinataireId: utilisateurs[(i + 1) % utilisateurs.length].id,
                    note: `Note ${i + 1}`,
                    courrierId: courriers[i % courriers.length].id,
                },
            })
        )
    );


    console.log('Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });