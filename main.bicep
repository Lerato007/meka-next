param location string = resourceGroup().location
param appName string = 'mekawc-app-${uniqueString(resourceGroup().id)}'
param sqlServerName string = 'mekawc-db-${uniqueString(resourceGroup().id)}'
param keyVaultName string = 'mekawckv${uniqueString(resourceGroup().id)}'

@secure()
@minLength(8)
param dbAdminPassword string

// 1. App Service Plan (Basic Tier for Cost Control)
resource appServicePlan 'Microsoft.Web/serverfarms@2022-09-01' = {
  name: 'asp-mekawc'
  location: location
  sku: {
    name: 'B1'
    capacity: 1
  }
  kind: 'linux'
  properties: {
    reserved: true
  }
}

// 2. App Service (Next.js Hosting with Managed Identity)
resource webApp 'Microsoft.Web/sites@2022-09-01' = {
  name: appName
  location: location
  identity: {
    type: 'SystemAssigned' // AZ-305 Concept: Zero-credential access to Key Vault
  }
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'NODE|20-lts'
      appSettings: [
        {
          name: 'WEBSITES_ENABLE_APP_SERVICE_STORAGE'
          value: 'false'
        }
      ]
    }
  }
}

// 3. PostgreSQL Flexible Server (Burstable Tier)
resource postgresServer 'Microsoft.DBforPostgreSQL/flexibleServers@2023-03-01-preview' = {
  name: sqlServerName
  location: location
  sku: {
    name: 'Standard_B1ms'
    tier: 'Burstable'
  }
  properties: {
    version: '14'
    administratorLogin: 'mekaadmin'
    administratorLoginPassword: dbAdminPassword
    storage: {
      storageSizeGB: 32
    }
  }
}

// Allow App Service to reach the Database
resource postgresFirewall 'Microsoft.DBforPostgreSQL/flexibleServers/firewallRules@2023-03-01-preview' = {
  parent: postgresServer
  name: 'AllowAllAzureServicesAndResourcesWithinIG'
  properties: {
    startIpAddress: '0.0.0.0'
    endIpAddress: '0.0.0.0'
  }
}

// 4. Azure Key Vault (RBAC Authorization)
resource keyVault 'Microsoft.KeyVault/vaults@2023-02-01' = {
  name: keyVaultName
  location: location
  properties: {
    sku: {
      family: 'A'
      name: 'standard'
    }
    tenantId: subscription().tenantId
    enableRbacAuthorization: true // AZ-104 Concept: Using RBAC instead of legacy access policies
  }
}

output webAppName string = webApp.name
output keyVaultName string = keyVault.name
