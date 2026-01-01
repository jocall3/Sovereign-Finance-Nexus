
export enum View {
  MetaDashboard = 'MetaDashboard',
  Dashboard = 'Dashboard',
  Transactions = 'Transactions',
  AIAdvisor = 'AIAdvisor',
  SendMoney = 'SendMoney',
  Budgets = 'Budgets',
  Investments = 'Investments',
  AgentMarketplace = 'AgentMarketplace',
  Orchestration = 'Orchestration',
  DataMesh = 'DataMesh',
  DataCommons = 'DataCommons',
  Mainframe = 'Mainframe',
  AIGovernance = 'AIGovernance',
  TheNexus = 'TheNexus',
  TheCharter = 'TheCharter',
  Settings = 'Settings'
}

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  merchant: string;
  date: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface UserProfile {
  name: string;
  email: string;
  tier: 'Sovereign' | 'Elite' | 'Standard';
  balance: number;
}
