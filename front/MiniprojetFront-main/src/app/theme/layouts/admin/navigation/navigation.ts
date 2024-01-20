import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  icon?: string;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}
const NavigationItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Default',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/default',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      }
    ]
  },
  
  {
    id: 'ServiceClient',
    title: 'Service client',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'ClientList',
        title: 'Clients',
        type: 'item',
        classes: 'nav-item',
        url: '/ClientList',
        icon: 'ti ti-dashboard',
        breadcrumbs: true
      }
    ]
  },
  {
    id: 'ServiceCategorie',
    title: 'Service categorie',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'CategorieList',
        title: 'Categorie',
        type: 'item',
        classes: 'nav-item',
        url: '/CategorieList',
        icon: 'ti ti-dashboard',
        breadcrumbs: true
      }
    ]
  },
  {
    id: 'ServiceProduit',
    title: 'Service produit',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'ProduitList',
        title: 'Produit',
        type: 'item',
        classes: 'nav-item',
        url: '/ProduitList',
        icon: 'ti ti-dashboard',
        breadcrumbs: true
      }
    ]
  }, {
    id: 'ServiceFacture',
    title: 'Service facture',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'FactureList',
        title: 'Facture',
        type: 'item',
        classes: 'nav-item',
        url: '/FactureList',
        icon: 'ti ti-dashboard',
        breadcrumbs: true
      }
    ]
  },
  {
    id: 'other',
    title: 'Other',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'ti ti-brand-chrome'
      }
    ]
  }
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
