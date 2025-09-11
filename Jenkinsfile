pipeline {
    agent any

    tools {
        nodejs 'NodeJS'  // Make sure to configure this in Jenkins Global Tools
    }

    environment {
        PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = '1' // Speeds up if cache exists
    }

    stages {
        
        stage('Clean Workspace') {
            steps {
                // This deletes everything in the workspace before the build starts
                deleteDir()
            }
        }

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Ritesh-xx/playwright_01.git'
            }
        }
        

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install --with-deps'
            }
        }

        
        stage('Install playwright allure') {
            steps {
                bat 'npm install -D allure-playwright'
            }
        }

        stage('Install allure') {
            steps {
                bat 'npm install -g allure-commandline --save-dev'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npx playwright test tests/specs/Register.spec.js --reporter=html,allure-playwright'
            }
        }

        stage('Generate Allure Report') {
            steps {
                bat 'npx allure generate allure-results --clean -o allure-report'
            }
        }

        stage('Publish Allure Report') {
            steps {
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']],
                    reportBuildPolicy: 'ALWAYS'
                ])
            }
        }

        stage('Publish HTML Report') {
            steps {
                publishHTML (target: [
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright HTML Report'
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/allure-report/**, **/playwright-report/**', fingerprint: true
        }
    }
}
