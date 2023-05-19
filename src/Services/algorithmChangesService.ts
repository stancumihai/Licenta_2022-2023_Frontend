import { IAlgorithmChangeCreate } from '../Models/AlgorithmChange/IAlgorithmChangeCreate';
import { IAlgorithmChangeRead } from '../Models/AlgorithmChange/IAlgorithmChangeRead';
import BaseService from './baseService';

export default class AlgorithmChangesService extends BaseService<IAlgorithmChangeRead | IAlgorithmChangeCreate>  { };