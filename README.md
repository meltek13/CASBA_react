---

## CASBA.com

![](https://www.sortiraparis.com/images/80/66131/643118-serie-friends-l-episode-retrouvailles-avec-justin-bieber-et-lady-gaga-diffuse-le.jpg)

#### - Présentation

> Habité a plusieurs, ca veut dire quoi ? Ça veut dire vie communautaire , organisation, loyer , responsabilité mais aussi des moments de joie et de partage !

CASBA.com est une appweb gratuite qui vous aide. Organiser une vie à plusieurs. Gerer les evenements de la "Casba", organiser les dépenses et répartisser les factures que vous soyez en colocation, en couple, ou en vacances entre amis.

- https://casba-react-front.herokuapp.com/
- https://casba-rails-api.herokuapp.com/

#### -Parcours utilisateur

Lorsqu’un utilisateur se connecte pour la première fois, il accède à la page d’accueil principale qui lui explique le concept, on lui propose directement de se créer un compte. Une fois connecté, on peut créer une collocation et ainsi inviter ses colocataire à la rejoindre via email. Ces derniers doivent également se créer un compte . _ Chaque utilisateur pourras écrire en son nom dans le calendrier( soirée vendredi 20 septembre, pas la du 10 au 15 blablabla ) _ Chaque utilisateur pourra poster des photos (genre preuve de menage, soirée a la collocation etc et tout ça resteras privée) _ Un tricount seras disponible pour les dépenses _ Lorsqu’on rentrera une dépense , on pourras choisir qui est concerné par cette dépense ( exemple : felix = « manu achète moi du dentifrice stp « manu = « ok je le met dans tricount « du coup tricount = felix doit 3,56 a manu pour le dentifrice « )

#### -Base de donnée

| USERS              | FLATSHARINGS       | CALENDARS   | EXPENSES               |
| ------------------ | ------------------ | ----------- | ---------------------- |
| id                 | id                 | id          | id_expense             |
| email              | title              | title       | title                  |
| encrypted_password | description        | description | date_of_expense        |
| nickname           | admin_id           | timedate    | total_amount           |
| avatar             | pending_invitation | dashboard   | concerned_colocs       |
|                    | flat_mate          | by          | split_amount_to_colocs |
|                    |                    |             | pending_payment        |
|                    |                    |             | paid_expense           |
|                    |                    |             | user                   |
|                    |                    |             | flatsharing            |

#### -Créateur

[@Melvin REGNAULT](https://github.com/meltek13 "@Melvin REGNAULT")
[@Théo CAZENAVE-COUPET](https://github.com/Kelvi3 "@Théo CAZENAVE-COUPET")
[@Boris N'KUAKO](https://github.com/bnthp16 "@Boris N'KUAKO")
[Frédéric SEGUIER](https://github.com/fred75013 "Frédéric SEGUIER")
