pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // Make sure you configure this in Jenkins global tools
    }

    environment {
        HOME = "${env.WORKSPACE}"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/Ritesh-xx/playwright_01.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test tests/specs/Register.spec.js --project=chromium'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished!'
        }
    }
}
