pipeline {
    agent any
    
    tools {
        nodejs "node.js"
        maven "maven"
    }

    stages {
        stage('Restore') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Tests') {
            steps {
                sh 'npm test'
                sh 'mvn clean test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
    
    post {
    always {
      deleteDir()
    }
  }
}
