import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { openDB, deleteDB, wrap, unwrap } from 'idb';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class IdbService {
  public dbPromise;
  constructor() {
  }

  async connectToIDB() {
    this.dbPromise = await openDB('userProfile', 1, {
      upgrade(db, oldVersion, newVersion, transaction) {
        db.createObjectStore('objectStoreValue');
        db.createObjectStore('objectStoreHash');
      },
      blocked() {
        // …
      },
      blocking() {
        // …
      }
    });
  }

  async getAllData(objectStore: string) {
    const tx = this.dbPromise.transaction(objectStore, 'readonly');
    const store = tx.objectStore(objectStore);
    const data = await store.getAll();
    return data;
  }

  async getDataByKey(objectStore: string, key: number) {
    const value = await this.dbPromise.get(objectStore, key);
    return value;
  }

  async getAllKey(objectStore: string) {
    const value = await this.dbPromise.getAllKeys(objectStore);
    return value;
  }
}
