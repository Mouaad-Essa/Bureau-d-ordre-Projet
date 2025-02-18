# Bureau d'Ordre App

**Bureau d'Ordre App** est une application web moderne développée pour automatiser et simplifier la gestion des courriers entrants et sortants dans une faculté. L'objectif est de faciliter le suivi des courriers, leur numérisation, archivage, ainsi que la génération de rapports d'activité tout en gérant les utilisateurs et les rôles via une interface intuitive.

---

## Fonctionnalités

- **Tableau de bord** avec vue d'ensemble des courriers en cours
- **Statistiques** sur les courriers entrants et sortants
- **Gestion des courriers** :
  - Enregistrement des courriers (entrant/sortant)
  - Attribution des courriers aux départements
  - Suivi de l'état (En attente, Traité, Clôturé)
- **Archivage** :
  - Numérisation et stockage des courriers
  - Classement automatique par catégorie et date
- **Recherche et filtrage avancé** des courriers par référence, expéditeur, destinataire, date, type de courrier et état
- **Rapports et statistiques** mensuels et annuels
  - Exportation des données en formats **PDF** et **Excel**
- **Gestion des utilisateurs** :
  - Création et gestion des comptes utilisateurs
  - Attribution des rôles et permissions

---

## Technologies utilisées

- **Frontend** : React.js / Next.js
- **Backend** : API avec **Node.js**, **Prisma ORM**
- **Base de données** : MySQL
- **Authentification** : JWT (JSON Web Tokens)
- **CSS** : Tailwind CSS
- **Composants UI** : Shadcn UI
- **Exportation des fichiers** : jsPDF, XLSX

---

## Architecture Technique

- **Frontend** : Utilisation de **React.js** et **Next.js** avec l'App Router pour la gestion des pages.
- **Base de données** : **Prisma ORM** pour interagir avec la base de données **MySQL**.
- **Authentification** : **JWT** pour sécuriser les routes et gérer les sessions utilisateur.
- **API** : Les actions serveur sont gérées dans les dossiers **actions** et **api**, contenant toutes les routes pour gérer les données et interactions avec la base de données.

---

## Organisation du Projet

L'organisation du projet suit une structure modulaire et claire, séparant les différentes parties de l'application afin de favoriser la lisibilité et la maintenabilité.

---

## Instructions de Configuration et Installation

### Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants sur votre machine :

- **Node.js** (version 16 ou supérieure) : [Télécharger Node.js](https://nodejs.org/)
- **MySQL** : Assurez-vous que MySQL est installé et en cours d'exécution sur votre machine.

### 1. Cloner le dépôt

Clonez le dépôt du projet à l'aide de Git :

```bash
git clone https://github.com/votre-utilisateur/bureau-ordre-app.git
cd bureau-ordre-app
```
## 2. Installer les dépendances
```bash
npm install
# ou
yarn install
```
## 3. Configuration des variables d'environnement
### Créez un fichier .env.local à la racine du projet et ajoutez les variables suivantes :
   ```bash
DATABASE_URL="mysql://username:password@localhost:3306/bureau_ordre_db"
JWT_SECRET="votre-clé-secrète"
```
## 4. Configurer la base de données
### Exécutez la migration Prisma pour configurer la base de données en utilisant le schéma défini :
   ```bash
npx prisma migrate dev
```
## 5. Lancer le serveur de développement
### Démarrez le serveur de développement pour voir l'application en action :
   ```bash
npm run dev
```
# ou
```
yarn dev
```
## L'application sera accessible à l'adresse http://localhost:3000.

