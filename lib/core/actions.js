const { promisify } = require('util')
const downloadGitRepo = promisify(require('download-git-repo'))
const { VUE_REPO } = require('../config/repo')
const execCommand = require('../utils/exec-command')
const compileEjs = require('../utils/compile-ejs')
const { writeFile, existsSync, mkdirSync } = require('../utils/write-file')
const { program } = require('commander')

/**
 * @description 创建项目
 * 
 * @param {string} projectName 项目名称
 * @param {any} others 其他的参数
 */
async function createProjectAction(projectName, others) {
  try {
    // 1.从GitHub下载模板
    await downloadGitRepo(VUE_REPO, projectName, { clone: true })

    // 2. 提示信息
    // console.log(`cd ${projectName}`)
    // console.log(`npm install`)
    // console.log(`npm run dev`)

    const commandName = process.platform === 'win32' ? 'npm.cmd' : 'npm'
    console.log(process.platform)
    // 3.帮助执行npm install
    await execCommand(commandName, ["install"], { cwd: `./${projectName}` })

    // 4.帮助执行npm run dev
    await execCommand(commandName, ["run", "dev"], { cwd: `./${projectName}` })
  } catch (err) {
    console.log(err)
  }
}

/**
 * @description 创建组件
 * 
 * @param {string} cpnName 组件名称
 * @param {any} others 其他的参数
 */
async function createComponentsAction(cpnName, others) {
  // 1.创建一个组件模板，根据内容给模板中填充数据
  const result = await compileEjs("component.vue.ejs", {
    name: cpnName,
    upperName: cpnName.toUpperCase()
  })

  // 2.将result写入到对应的文件夹中
  const dest = program.opts().dest ?? "src/components"
  if (!existsSync()) {
    mkdirSync(dest)
  }
  await writeFile(`${dest}/${cpnName}.vue`, result)
  console.log("创建组件成功", `${cpnName}`)
}

module.exports = { createProjectAction, createComponentsAction }