#!/usr/bin/env node
const { program } = require("commander");
const helpOptions = require("./core/help-option");
const { createProjectAction, createComponentsAction } = require("./core/actions");

// 1.配置所有的options
helpOptions()

// 2.增加具体的功能操作
program
  .command("create <projectName> [others...]")
  .description("创建项目，eg：cli_test create test")
  .action(createProjectAction);

program
  .command("addcpn <cpnName> [others...]")
  .description("创建组件，eg：cli_test addcpn NavBar -d src/components")
  .action(createComponentsAction);


program.parse();
