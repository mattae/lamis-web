import {OnDestroy, OnInit} from '@angular/core';
import {CaseManager, CaseManagerStats, Patient} from '../../model/case-management.model';
import {CaseManagementService} from '../../services/case-management.service';
import {CardViewItem, NotificationService} from '@alfresco/adf-core';
import {TdDialogService} from '@covalent/core';
import {RxStompService} from '@stomp/ng2-stompjs';

export interface Filter {
    upperAgeLimit?: number;
    lowerAgeLimit?: number;
    pregnant?: boolean;
    breastfeeding?: boolean;
    lgaId?: number;
    facilityId?: number;
    status?: string;
    gender?: string;
    hospitalNum?: string;
    page?: number;
    size?: number;
    assigned?: boolean;
}

export declare class PatientListComponent implements OnInit, OnDestroy {
    private service;
    private _dialogService;
    private notificationService;
    private stompService;
    caseManagers: CaseManager[];
    caseManager: CaseManager;
    patients: Patient[];
    properties: Array<CardViewItem>;
    globalProperties: Array<CardViewItem>;
    stats: CaseManagerStats;
    globalStats: CaseManagerStats;
    facilityId: number;
    filter: Filter;
    ageLimit: number;
    pregnancyStatus: number;
    states: any[];
    lgas: any[];
    hospitalNum: string;
    totalItems: number;
    page: number;
    itemsPerPage: number;
    loading: boolean;
    initializing: boolean;
    private topicSubscription;

    constructor(service: CaseManagementService, _dialogService: TdDialogService, notificationService: NotificationService, stompService: RxStompService);

    ngOnInit(): void;

    ngOnDestroy(): void;

    clearHospitalNum(): void;

    search(): void;

    assignClients(): void;

    deAssignClients(): void;

    selections(): boolean;

    loadPage(page: any): void;

    select(event: any): void;

    caseManagerChanged(): void;

    updateList(): void;

    ageGroupChanged(): void;

    pregnancyStatusChanged(): void;

    stateChanged(id: any): void;

    assigned(val: any): void;

    lgaChanged(id: any): void;

    buildStats(): void;

    buildGlobalStats(): void;
}
