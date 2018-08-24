/*
  角色权限排序
*/
export const roleAuthsSort = (auths, roleAuths) => {
  let relist = []
  auths.forEach(e => {
    e.level = 1
    e.isSelect = false
    if (roleAuths && roleAuths.includes(e.id)) {
      e.isSelect = true
    }
    if (e.subData) {
      e.subData.forEach((i, idx) => {
        i.level = 2
        i.parant = e
        i.isSelect = false
        if (roleAuths && roleAuths.includes(i.id)) {
          i.isSelect = true
        }
        if (i.subData) {
          i.subData.forEach(j => {
            j.level = 3
            j.isSelect = false
            if (roleAuths && roleAuths.includes(j.id)) {
              j.isSelect = true
            }
          })
        }
        if (e.subData.length > 1) {
          if (idx === 0) {
            i.childsLength = e.subData.length
          } else {
            i.childsLength = 0
          }
        }
        relist.push(i)
      })
    } else {
      relist.push(e)
    }
  })
  return relist
}

/*
  角色权限表格规则
*/
export const authsTableMerge = ({ row, column, rowIndex, columnIndex }) => {
  if (row.level === 2) {
    if (row.childsLength !== undefined && columnIndex === 0) return [row.childsLength, 1]
  }
}

/*
  角色权限复选框规则
*/
export const roleAuthsCheckBoxSelect = (data, list) => {
  let level = data.level
  let status = data.isSelect
  if (status && level === 1) {
    list.forEach(ele => {
      if (ele.parent_id === data.id) {
        ele.isSelect = true
        if (ele.subData) ele.subData.forEach(e => { e.isSelect = true })
      }
    })
  } else if (!status && level === 1) {
    list.forEach(ele => {
      if (ele.parent_id === data.id) {
        ele.isSelect = false
        if (ele.subData) ele.subData.forEach(e => { e.isSelect = false })
      }
    })
  } else if (status && level === 2) {
    data.parant.isSelect = true
    if (data.subData) data.subData.forEach(e => { e.isSelect = true })
  } else if (!status && level === 2) {
    if (data.subData) data.subData.forEach(e => { e.isSelect = false })
    let selectNumber = 0
    list.forEach(ele => {
      if (ele.parent_id === data.parent_id && ele.isSelect) selectNumber++
    })
    if (selectNumber === 0) data.parant.isSelect = false
  } else if (status && level === 3) {
    list.forEach(ele => {
      if (ele.id === data.parent_id) {
        ele.isSelect = true
        ele.parant.isSelect = true
      }
    })
  } else if (!status && level === 3) {
    let selectNumber = 0
    let idx = list.map(ele => ele.id).indexOf(data.parent_id)
    let item = list[idx]
    item.subData.forEach(ele => {
      if (ele.isSelect) selectNumber++
    })
    if (selectNumber === 0) item.isSelect = false
    selectNumber = 0
    list.forEach(ele => {
      if (ele.parent_id === item.parent_id && ele.isSelect) selectNumber++
    })
    if (selectNumber === 0) item.parant.isSelect = false
  }
}

/*
  角色权限提取已选的ID出来
*/
export const roleAuthsFormatId = list => {
  let result = []
  list.forEach(ele => {
    if (ele.isSelect) {
      result.push(ele.id)
      if (ele.parant && !result.includes(ele.parant.id)) result.push(ele.parant.id)
    }
    if (ele.subData) {
      ele.subData.forEach(e => {
        if (e.isSelect) result.push(e.id)
      })
    }
  })
  return result.join(',')
}
