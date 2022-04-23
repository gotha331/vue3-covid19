export interface ShowAddSwitch {
  suspect: boolean;
  dead: boolean;
  nowConfirm: boolean;
  localinfeciton: boolean;
  all: boolean;
  confirm: boolean;
  heal: boolean;
  nowSevere: boolean;
  importedCase: boolean;
  noInfect: boolean;
  localConfirm: boolean;
}

export interface Today {
  confirm: number;
  isUpdated: boolean;
}

export interface Total {
  nowConfirm: number;
  confirm: number;
  adcode: string;
  continueDayZeroLocalConfirm: number;
  provinceLocalConfirm: number;
  continueDayZeroLocalConfirmAdd: number;
  showHeal: boolean;
  wzz: number;
  mediumRiskAreaNum: number;
  mtime: string;
  dead: number;
  showRate: boolean;
  heal: number;
  highRiskAreaNum: number;
}

export interface Today {
  tip: string;
  wzz_add: number;
  confirm: number;
  confirmCuts: number;
  isUpdated: boolean;
}

export interface Total {
  confirm: number;
  showHeal: boolean;
  highRiskAreaNum: number;
  showRate: boolean;
  wzz: number;
  mtime: string;
  nowConfirm: number;
  dead: number;
  provinceLocalConfirm: number;
  continueDayZeroLocalConfirmAdd: number;
  continueDayZeroLocalConfirm: number;
  heal: number;
  adcode: string;
  mediumRiskAreaNum: number;
}

export interface Today {
  confirm: number;
  confirmCuts: number;
  isUpdated: boolean;
}

export interface Total {
  mediumRiskAreaNum: number;
  highRiskAreaNum: number;
  continueDayZeroLocalConfirmAdd: number;
  nowConfirm: number;
  confirm: number;
  heal: number;
  adcode: string;
  wzz: number;
  continueDayZeroLocalConfirm: number;
  mtime: string;
  dead: number;
  showRate: boolean;
  showHeal: boolean;
  provinceLocalConfirm: number;
}

export interface Children {
  name: string;
  today: Today;
  total: Total;
}

export interface Children {
  name: string;
  today: Today;
  total: Total;
  children: Children[];
}

export interface AreaTree {
  name: string;
  today: Today;
  total: Total;
  children: Children[];
}

export interface ChinaTotal {
  heal: number;
  dead: number;
  nowConfirm: number;
  suspect: number;
  noInfectH5: number;
  localConfirm: number;
  localConfirmH5: number;
  local_acc_confirm: number;
  confirm: number;
  nowSevere: number;
  importedCase: number;
  noInfect: number;
  showLocalConfirm: number;
  showlocalinfeciton: number;
}

export interface ChinaAdd {
  nowSevere: number;
  importedCase: number;
  noInfectH5: number;
  confirm: number;
  dead: number;
  nowConfirm: number;
  suspect: number;
  heal: number;
  noInfect: number;
  localConfirm: number;
  localConfirmH5: number;
}

export interface Diseaseh5Shelf {
  showAddSwitch: ShowAddSwitch;
  areaTree: AreaTree[];
  lastUpdateTime: string;
  chinaTotal: ChinaTotal;
  chinaAdd: ChinaAdd;
  isShowAdd: boolean;
}

export interface StatisGradeCityDetail {
  nowConfirm: number;
  sdate: string;
  syear: number;
  grade: string;
  date: string;
  province: string;
  city: string;
  confirmAdd: number;
  confirm: number;
  dead: number;
  heal: number;
  mtime: string;
}

export interface RootObject {
  diseaseh5Shelf: Diseaseh5Shelf;
  statisGradeCityDetail: StatisGradeCityDetail[];
}