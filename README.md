# 🗂 Mini Task Manager – Kubernetes Microservices Project

Mini Task Manager est une application fullstack déployée sur Kubernetes avec une architecture microservices.

Le projet comprend :

- Un frontend Angular
- Deux microservices backend (Task Service & User Service)
- Une base de données MySQL (StatefulSet)
- Une configuration complète Kubernetes (Namespace, RBAC, Ingress, Secrets)

---

# 🏗 Architecture

```
Client (Browser)
        ↓
      Ingress
        ↓
   Frontend (Angular)
        ↓
────────────────────────────────
│                              │
Task Service               User Service
(Node.js / Express)       (Node.js / Express)
│                              │
─────────────── MySQL (StatefulSet) ───────────────
```

---

# 🧩 Microservices

## 🎨 Frontend
- Angular 20
- Standalone Components
- Signals
- HttpClient
- Dockerisé
- Exposé via Ingress

---

## 📝 Task Service
- CRUD des tâches
- Gestion des permissions
- Accès MySQL
- Vérification rôle admin

Endpoints principaux :
- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
- GET /api/tasks/admin

---

## 👤 User Service
- Création utilisateur
- Attribution rôle (admin / user)
- Récupération liste utilisateurs

Endpoints principaux :
- POST /api/users
- GET /api/users/all

---

## 🗄 Base de données

- MySQL 8
- Déployé en StatefulSet
- PersistentVolumeClaim
- ConfigMap (configuration)
- Secret (credentials)

---

# ☸ Kubernetes

Dossier : `task-manager-kubernetes/`

## 📦 Ressources déployées

- namespace.yaml
- front-deployment.yaml
- front-service.yaml
- back-deployment.yaml
- back-service.yaml
- back-user-deployment.yaml
- back-user-service.yaml
- mysql-statefulset.yaml
- mysql-configmap.yaml
- mysql-secret.yaml
- ingress.yaml
- serviceaccount.yaml
- rbac-admin-role.yaml
- rbac-developer-role.yaml
- rbac-viewer-role.yaml
- rbac-bindings.yaml

---

# 🔐 RBAC

Une configuration RBAC (Role-Based Access Control) a été mise en place afin de contrôler les permissions des microservices au sein du namespace `task-manager`.

## 📌 ServiceAccounts utilisés

Les ServiceAccounts suivants ont été créés :

- `front-sa` → utilisé par le frontend Angular
- `back-sa` → utilisé par le microservice Task
- `back-user-sa` → utilisé par le microservice User
- `mysql-sa` → utilisé par MySQL

## 📌 Rôles définis

Trois rôles ont été définis dans le namespace :

- `admin-role`
- `developer-role`
- `viewer-role`

## 📌 Attribution des permissions

Les permissions sont associées via des RoleBindings :

- `back-sa` → `developer-role`
- `back-user-sa` → `developer-role`
- `front-sa` → `viewer-role`

Cette configuration permet :

- Aux services backend de gérer certaines ressources Kubernetes (deployments, services).
- Au frontend d’avoir un accès en lecture seule.
- À chaque composant d’être isolé via son propre ServiceAccount.

# ⚙️ Prérequis

- Docker
- Minikube
- kubectl
- Compte Docker Hub

---

# 🚀 Lancer le projet

## 1️⃣ Cloner le repository

```bash
git clone https://github.com/ManarDEHMANI/projet-virtualisation.git
cd projet-virtualisation
```

---

## 2️⃣ Démarrer Minikube

```bash
minikube start
```

Activer Ingress :

```bash
minikube addons enable ingress
```

---

## 3️⃣ Déployer le namespace

```bash
kubectl apply -f task-manager-kubernetes/namespace.yaml
```

---

## 4️⃣ Déployer toutes les ressources

```bash
kubectl apply -f task-manager-kubernetes/
```

---

## 5️⃣ Vérifier le déploiement

```bash
kubectl get pods -n task-manager
kubectl get svc -n task-manager
kubectl get ingress -n task-manager
```

---

# 🌍 Accès à l'application

Via Ingress :

```
http://taskmanager.local
```

Si nécessaire, ajouter dans `/etc/hosts` :

```
<minikube-ip> taskmanager.local
```

Obtenir l’IP :

```bash
minikube ip
```

---

# 🧠 Concepts Kubernetes utilisés

- Namespace isolation
- Microservices architecture
- StatefulSet
- Persistent storage
- ConfigMap
- Secret
- RBAC
- ServiceAccount
- Ingress Controller
- ClusterIP Services

---

# 📦 Images Docker

Les images utilisées sont publiées sur Docker Hub :

- task-manager-front
- task-manager-back
- task-manager-back-user

---

# 🎯 Objectif pédagogique

Ce projet démontre :

- Architecture microservices
- Séparation frontend/backend
- Sécurisation avec RBAC
- Gestion des secrets
- Déploiement Kubernetes complet
- Orchestration d’un système fullstack

---

# 👨‍💻 Auteur

DEHMANI Manar et SIARRI Julie

Projet réalisé dans le cadre du module Virtualisation / Kubernetes.