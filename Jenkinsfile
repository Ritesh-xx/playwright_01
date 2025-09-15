pipeline {
    
    agent any

    tools {
        nodejs 'NodeJS' // Use the NodeJS tool you configured in Jenkins
    }

    options {
        timeout(time: 60, unit: 'MINUTES')
        timestamps()
    }

    environment {
    CI = 'true'
    PLAYWRIGHT_BROWSERS_PATH = 'C:/Users/Ascendion/AppData/Local/ms-playwright' // Use global Playwright browsers
  }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test Register.spec.js --reporter=html,allure-playwright'
            }
        }

        stage('Generate Allure Report') {
            steps {
                bat 'npx allure generate allure-results --clean -o allure-report'
            }
        }

        stage('Archive Test Reports') {
            steps {
                archiveArtifacts artifacts: 'allure-report/**', fingerprint: true
                archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }

    cleanWs()
}
