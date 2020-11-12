import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ServerApiUrlConfig} from '@lamis/web-core';
import {
    Adr,
    Devolve,
    DrugDTO,
    Patient,
    Pharmacy,
    PharmacyLine,
    Regimen,
    RegimenInfo,
    RegimenType
} from '../model/pharmacy.model';
import * as moment_ from 'moment';
import {Moment} from 'moment';

declare type EntityResponseType = HttpResponse<Pharmacy>;
declare type EntityArrayResponseType = HttpResponse<Pharmacy[]>;

export declare class PharmacyService {
    protected http: HttpClient;
    private serverUrl;
    resourceUrl: string;

    constructor(http: HttpClient, serverUrl: ServerApiUrlConfig);

    create(pharmacy: Pharmacy): Observable<EntityResponseType>;

    update(pharmacy: Pharmacy): Observable<EntityResponseType>;

    find(id: number): Observable<EntityResponseType>;

    findByUuid(id: string): Observable<EntityResponseType>;

    delete(id: number): Observable<HttpResponse<any>>;

    getPatient(id: any): Observable<Patient>;

    getVisitDatesByPatient(patientId: number): Observable<moment_.Moment[]>;

    regimenTypes(): Observable<RegimenType[]>;

    regimenInfo(patientId: number): Observable<RegimenInfo>;

    adrs(): Observable<Adr[]>;

    getLinesByPharmacy(pharmacyId: number): Observable<PharmacyLine[]>;

    regimesByRegimenType(id: number): Observable<Regimen[]>;

    getDrugsByRegimen(id: number): Observable<DrugDTO[]>;

    getRegimenById(id: any): Observable<Regimen>;

    latestVisit(patientId: number): Observable<Pharmacy>;

    getDevolvement(patientId: number, date: Moment): Observable<Devolve>;

    protected convertDateFromClient(pharmacy: Pharmacy): Pharmacy;

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType;

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType;
}

export {};