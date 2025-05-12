export interface SubMenu {
    id: number
    subMenuName: string
    icon: string
    url: string
    mainMenuId: mainMenuId | null
}

export interface mainMenuId {
    id: number
    menuName: string
    icon: string
    menuType: number
}