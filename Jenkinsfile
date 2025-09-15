pipeline {
    agent {
        label 'linux' // or 'any' if no specific agent is needed
    }

    tools {
        nodejs 'NodeJS' // Use the NodeJS tool you configured in Jenkins
    }

    options {
        timeout(time: 60, unit: 'MINUTES')
        timestamps()
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Ritesh-xx/playwright_01.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bash 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bash 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bash 'npx playwright test Register.spec.js --reporter=html,allure-playwright'
            }
        }

        stage('Generate Allure Report') {
            steps {
                bash 'npx allure generate allure-results --clean -o allure-report'
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
}
