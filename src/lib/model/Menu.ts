import { SubMenu } from "./SubMenu"

export interface Menu {
    id : number
    menuName : string
    url : string
    icon : string
    menuType : number
    subMenu : SubMenu[] | null
}