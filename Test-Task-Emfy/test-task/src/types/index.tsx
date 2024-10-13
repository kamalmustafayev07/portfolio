export type Lead = {
    id:number;
    name: string;
    price:number;
    responsible_user_id : number;
    group_id:number;
    status_id:number;
    pipeline_id:number;
    lose_reason_id:number;
    created_by:number;
    updated_by:number;
    closed_at:number;
    closest_task_at:number;
    is_deleted:boolean;
    custom_fields_values?: string;
    score?: number;
    account_id:number;
    labor_cost?: number;
    _links : LeadLinks;
    _embedded : LeadEmbedded;
}

export type LeadLinks = {
    self: Link;
}

export type Link = {
    href : string;
}

export type LeadEmbedded = {
    tags : Array<string>;
    companies : Array<Company>;
}

export type Company = {
    id:number,
    _links: LeadLinks,
}
