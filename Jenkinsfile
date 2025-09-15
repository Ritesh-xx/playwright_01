pipeline {
    agent any

    tools {
        nodejs 'NodeJS' 
    }

    options {
        timeout(time: 60, unit: 'MINUTES')
        timestamps()
    }

    environment {
        CI = 'true'
        PLAYWRIGHT_BROWSERS_PATH = 'C:\\Users\\Ascendion\\AppData\\Local\\ms-playwright' 
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
                bat 'npx playwright test tests/specs/Register.spec.js --reporter=html,allure-playwright'
            }
        }

        stage('Generate Allure Report') {
            steps {
                bat 'npx allure generate allure-results --clean -o allure-report'
            }
        }

        stage('Publish Reports') {
            steps {
                script {
                    // Publish Allure HTML report in Jenkins sidebar
                    publishHTML([
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'allure-report',
                        reportFiles: 'index.html',
                        reportName: 'Allure Report',
                        reportTitles: 'Allure Test Results'
                    ])

                    // Publish Playwright HTML report in Jenkins sidebar
                    publishHTML([
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Playwright Report',
                        reportTitles: 'Playwright Test Results'
                    ])
                }
            }
        }

        stage('Archive Reports') {
            steps {
                archiveArtifacts artifacts: 'allure-report/**/*, playwright-report/**/*', fingerprint: true
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
        cleanup {
            cleanWs()
        }
    }
}
