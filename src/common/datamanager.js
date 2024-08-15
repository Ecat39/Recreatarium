import Phaser from '../lib/phaser.js';

const LOCAL_STORAGE_KEY = 'REBIRTHARIUM_DATA';

/**
 * @typedef GlobalState
 * @type {object}
 * @property {object} options
 * @property {number} options.zoomstate
 * @property {boolean} options.musicstate
 * @property {boolean} options.soundeffectstate
 * @property {number} options.storagestate
 * @property {number} level
 * @property {object} resources
 * @property {number} resources.gem
 * @property {number} resources.wood
 * @property {number} resources.mud
 * @property {number} resources.stone
 * @property {number} resources.pollen
 * @property {number} resources.water
 * @property {number} resources.grass
 */

/** @type {GlobalState} */
const initialState = {
    options: {
        zoomstate: 1,
        musicstate: true,
        soundeffectstate: true,
        storagestate: 1,
    },
    level: 1,
    resources: {
        gem: 0,
        wood: 5000,
        mud: 5000,
        stone: 5000,
        pollen: 1500,
        water: 1500,
        grass: 1500,
    },
};

export const DATA_MANAGER_STORE_KEYS = Object.freeze({
    OPTIONS_ZOOMSTATE: 'OPTIONS_ZOOMSTATE',
    OPTIONS_MUSICSTATE: 'OPTIONS_MUSICSTATE',
    OPTIONS_SOUNDSTATE: 'OPTIONS_SOUNDSTATE',
    OPTIONS_STORAGESTATE: 'OPTIONS_STORAGESTATE',
    PLAYER_LEVEL: 'PLAYER_LEVEL',
    GEM: 'GEM',
    WOOD: 'WOOD',
    MUD: 'MUD',
    STONE: 'STONE',
    POLLEN: 'POLLEN',
    WATER: 'WATER',
    GRASS: 'GRASS'
});

class DataManager extends Phaser.Events.EventEmitter {
  #store;

  constructor() {
    super();
    this.#store = new Phaser.Data.DataManager(this);
    // initialize state with initial values
    this.#updateDataManger(initialState);
  }

  get store() {
    return this.#store;
  }

  loadData() {
    // attempt to load data from browser storage and populate the data manager
    if (typeof Storage === 'undefined') {
      console.warn(
        `[${DataManager.name}:loadData] localStorage is not supported, will not be able to save and load data.`
      );
      return;
    }

    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData === null) {
      return;
    }
    try {
      const parsedData = JSON.parse(savedData);
      this.#updateDataManger(parsedData);
    } catch (error) {
      console.warn(
        `[${DataManager.name}:loadData] encountered an error while attempting to load and parse saved data.`
      );
    }
  }

  saveData() {
    // attempt to storage data in browser storage from data manager
    if (typeof Storage === 'undefined') {
      console.warn(
        `[${DataManager.name}:saveData] localStorage is not supported, will not be able to save and load data.`
      );
      return;
    }
    const dataToSave = this.#dataManagerDataToGlobalStateObject();
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
  }

  #updateDataManger(data) {
    this.#store.set({
      [DATA_MANAGER_STORE_KEYS.OPTIONS_ZOOMSTATE]: data.options.zoomstate,
      [DATA_MANAGER_STORE_KEYS.OPTIONS_MUSICSTATE]: data.options.musicstate,
      [DATA_MANAGER_STORE_KEYS.OPTIONS_SOUNDSTATE]: data.options.soundeffectstate,
      [DATA_MANAGER_STORE_KEYS.OPTIONS_STORAGESTATE]: data.options.storagestate,
      [DATA_MANAGER_STORE_KEYS.PLAYER_LEVEL]: data.level,
      [DATA_MANAGER_STORE_KEYS.GEM]: data.resources.gem,      
      [DATA_MANAGER_STORE_KEYS.WOOD]: data.resources.wood,
      [DATA_MANAGER_STORE_KEYS.MUD]: data.resources.mud,
      [DATA_MANAGER_STORE_KEYS.STONE]: data.resources.stone,
      [DATA_MANAGER_STORE_KEYS.POLLEN]: data.resources.pollen,
      [DATA_MANAGER_STORE_KEYS.WATER]: data.resources.water,
      [DATA_MANAGER_STORE_KEYS.GRASS]: data.resources.grass,
    });
  }

#dataManagerDataToGlobalStateObject() {
return {
    options: {
        zoomstate: this.#store.get(DATA_MANAGER_STORE_KEYS.OPTIONS_ZOOMSTATE),
        musicstate: this.#store.get(DATA_MANAGER_STORE_KEYS.OPTIONS_MUSICSTATE),
        soundeffectstate: this.#store.get(DATA_MANAGER_STORE_KEYS.OPTIONS_SOUNDSTATE),
        storagestate: this.#store.get(DATA_MANAGER_STORE_KEYS.OPTIONS_STORAGESTATE),
    },
    level: this.#store.get(DATA_MANAGER_STORE_KEYS.PLAYER_LEVEL),
    resources: {
        gem: this.#store.get(DATA_MANAGER_STORE_KEYS.GEM),
        wood: this.#store.get(DATA_MANAGER_STORE_KEYS.WOOD),
        mud: this.#store.get(DATA_MANAGER_STORE_KEYS.MUD),
        stone: this.#store.get(DATA_MANAGER_STORE_KEYS.STONE),
        pollen: this.#store.get(DATA_MANAGER_STORE_KEYS.POLLEN),
        water: this.#store.get(DATA_MANAGER_STORE_KEYS.WATER),
        grass: this.#store.get(DATA_MANAGER_STORE_KEYS.GRASS),
      },    
    };
  }
}

export const dataManager = new DataManager();