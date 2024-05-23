

# AROSAJE

## Description
Arosaje est une application permettant aux utilisateurs de faire garder leurs plantes par des botanistes. L'application permet le partage de photos des plantes à garder et offre des conseils d'entretien fournis par des professionnels.

## Fonctionnalités
- **Affichage de plantes sur une carte :** Visualisez les plantes disponibles pour le gardiennage sur une carte interactive.
- **Chat intégré avec option photo :** Communiquez directement avec les utilisateurs et les botanistes via un chat intégré, avec la possibilité de partager des photos.
- **Demande de conseils :** Obtenez des conseils d'entretien personnalisés pour vos plantes.
- **Ajout de plantes à faire garder :** Ajoutez vos plantes à la liste de celles à garder, avec toutes les informations nécessaires.
- **Gardiennage de plantes :** Faites garder vos plantes par d'autres utilisateurs.

## Technologies Utilisées
- **Design :**  
- **Front-End :** [Next.js](https://nextjs.org/) with [Capacitor](https://capacitorjs.com/) for mobile development
- **UI :** [Tailwind Documentation](https://tailwindcss.com) for managing CSS pairing with [NextUi Documentation](https://nextui.org) for premaid customisable compnents
- **Back-End :** [Fastify](https://fastify.dev/) with [TypeORM](https://typeorm.io/) for database management
- **Database :** [SQLite](https://www.sqlite.org/index.html)
- **Tests :** [Jest](https://jestjs.io/fr/) for unit and integration testing

## Installation

1. Clonez le répertoire du projet.

   ```bash
   git clone
   ```

1. Installez les dépendances pour le front-end et le back-end.

    ```bash
    cd frontend
    npm install
    ```

    ```bash
    cd ../backend
    npm install
    ```
   
## Configurez l'environnement de développement.

Copiez le fichier .env.example et renommez-le en .env.
Configurez les variables d'environnement nécessaires.
Lancement de l'Application

- Lancez le serveur back-end.

  ```bash
  cd backend
  npm start
  ```
- Lancez le serveur front-end
  
  ```bash
  cd frontend
  npm dev
  ```

- Pour exporter l'application au format mobile, utilisez Capacitor.

  ```bash
  npx cap open [PLATFORM]
  ```

## Tests

Pour exécuter les tests unitaires et d'intégration.

```bash
Copy code
npm test
````


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!



## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## License
Ce projet est sous licence ISC.

## Auteurs
- Mattéo CAMPUS
- Guillaume BONNAMOUR
- Ludovic EDJAGA NANGA
- Jérémy DASSAUD
- Elliot CROZET
