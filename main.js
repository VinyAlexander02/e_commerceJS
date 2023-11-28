import { catalogRender } from "./src/cardProducts";
import { updateCartPrice, cartStart, productCartRender } from './src/menuCart';
import {filtersStart} from './src/catalogFilter'

catalogRender();
cartStart();
productCartRender();
updateCartPrice();
filtersStart();
