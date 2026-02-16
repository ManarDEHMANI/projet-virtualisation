# 🗂 Mini Task Manager – Kubernetes Fullstack Project

Mini Task Manager est une application web complète permettant de gérer des tâches :

- ➕ Ajouter une tâche
- ✏️ Modifier une tâche
- ❌ Supprimer une tâche
- 📋 Lister les tâches

Le projet est entièrement conteneurisé et déployé sur Kubernetes.

---

# 🏗 Architecture

```
Utilisateur
    ↓
Frontend (Angular - NodePort)
    ↓
Backend (Node.js / Express - ClusterIP)
    ↓
MySQL (StatefulSet + PersistentVolume)
```

---

# 🛠 Stack Technique

## Frontend
- Angular
- HttpClient
- Déployé via Docker
- Exposé via Service NodePort

## Backend
- Node.js
- Express
- Connexion MySQL
- Variables d’environnement via Kubernetes Secrets

## Base de données
- MySQL 8
- StatefulSet
- PersistentVolume + PersistentVolumeClaim
- Initialisation automatique

## Orchestration
- Kubernetes
- Minikube (en local)

---

# 📁 Structure du projet

```
projet-virtualisation/
│
├── task-manager-front/
│   ├── Dockerfile
│   └── code Angular
│
├── task-manager-back/
│   ├── Dockerfile
│   └── code Express
│
│
└── k8s/
    ├── front-deployment.yaml
    ├── front-service.yaml
    ├── back-deployment.yaml
    ├── back-service.yaml
    ├── mysql-statefulset.yaml
    ├── mysql-secret.yaml
    ├── mysql-service.yaml
    ├── mysql-storage.yaml
    └── mysql-configmap.yaml
```

---

# ⚙️ Prérequis

- Docker installé
- Minikube installé
- kubectl installé
- Compte Docker Hub

---

# 🚀 Lancer le projet

## 1️⃣ Cloner le projet

```bash
git clone https://github.com/ManarDEHMANI/projet-virtualisation.git
cd projet-virtualisation
```

---

## 2️⃣ Démarrer Minikube

```bash
minikube start
```

Vérifier que tout est bien lancé :

```bash
minikube status
```

---

## 3️⃣ Déployer l'application sur Kubernetes

```bash
kubectl apply -f task-manager-kubernetes/
```

Vérifier que tous les pods sont en `Running` :

```bash
kubectl get pods
```

---

## (Optionnel) Vérifier le backend

Pour tester le backend localement :

```bash
kubectl port-forward deployment/task-manager-back 3001:3000
```

Puis :

```bash
curl http://localhost:3001/api/tasks
```

---

# 🌍 Accéder à l'application

Récupérer l'URL du frontend :

```bash
minikube service task-manager-front-service
```

Si le navigateur ne s’ouvre pas automatiquement, copier l’URL affichée et l’ouvrir manuellement.

---

# ✅ Statut

✔ Frontend déployé  
✔ Backend connecté à MySQL  
✔ Base persistante  
✔ Communication interne fonctionnelle  

---

