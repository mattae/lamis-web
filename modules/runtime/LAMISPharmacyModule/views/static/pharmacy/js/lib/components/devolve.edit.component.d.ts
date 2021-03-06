import {OnInit} from '@angular/core';
import {
    CommunityPharmacy,
    Devolve,
    Patient,
    RelatedCD4,
    RelatedClinic,
    RelatedPharmacy,
    RelatedViralLoad
} from '../model/pharmacy.model';
import * as moment_ from 'moment';
import {Moment} from 'moment';
import {PharmacyService} from '../services/pharmacy.service';
import {CardViewItem, NotificationService} from '@alfresco/adf-core';
import {AppLoaderService} from '@lamis/web-core';
import {ActivatedRoute} from '@angular/router';
import {DevolveService} from '../services/devolve.service';

export interface Dmoc {
    name: string;
    value: string;
}

export declare class DevolveEditComponent implements OnInit {
    private pharmacyService;
    private devolveService;
    protected notification: NotificationService;
    private appLoaderService;
    protected activatedRoute: ActivatedRoute;
    entity: Devolve;
    relatedClinic: RelatedClinic;
    relatedPharmacy: RelatedPharmacy;
    relatedCD4: RelatedCD4;
    relatedViralLoad: RelatedViralLoad;
    communityPharmacies: CommunityPharmacy[];
    states: any[];
    lgas: any[];
    dmocTypes: Dmoc[];
    patient: Patient;
    dateRegistration: Moment;
    maxNextVisit: Moment;
    isSaving: boolean;
    error: boolean;
    tomorrow: moment_.Moment;
    today: moment_.Moment;
    minNextAppointment: Moment;
    editing: {};
    state: any;
    lga: any;
    devolveDates: Moment[];
    enableCommunityPharmacy: boolean;
    properties: Array<CardViewItem>;
    minDate: Moment;
    minDiscontinued: Moment;

    constructor(pharmacyService: PharmacyService, devolveService: DevolveService, notification: NotificationService, appLoaderService: AppLoaderService, activatedRoute: ActivatedRoute);

    createEntity(): Devolve;

    ngOnInit(): void;

    dateDiscontinuedChanged(): void;

    filterDates(date: Moment): boolean;

    stateChanged(id: any): void;

    lgaChanged(id: any): void;

    communityPharmacyChanged(communityPharmacy: CommunityPharmacy): void;

    dmocChanged(dmocType: string): void;

    dateDevolvedChanged(date: Moment): void;

    updateRelated(): void;

    entityCompare(e1: any, e2: any): boolean;

    previousState(): void;

    save(): void;

    private subscribeToSaveResponse;
    private onSaveSuccess;
    private onSaveError;

    protected onError(errorMessage: string): void;
}
