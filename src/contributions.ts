import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation'
import { JSONValidationExtensionPoint } from 'vs/workbench/api/common/jsonValidationExtensionPoint'
import { IWorkbenchContribution, WorkbenchPhase, registerWorkbenchContribution2 } from 'vs/workbench/common/contributions'
import { ColorExtensionPoint } from 'vs/workbench/services/themes/common/colorExtensionPoint'
import { IconExtensionPoint } from 'vs/workbench/services/themes/common/iconExtensionPoint'
// Selectively comes from vs/workbench/contrib/codeEditor/browser/codeEditor.contribution.ts
import 'vs/workbench/contrib/codeEditor/browser/workbenchReferenceSearch'
import 'vs/workbench/contrib/codeEditor/browser/menuPreventer'
import 'vs/workbench/contrib/codeEditor/browser/diffEditorHelper'
import 'vs/workbench/contrib/codeEditor/browser/largeFileOptimizations'
import 'vs/workbench/contrib/codeEditor/browser/inspectEditorTokens/inspectEditorTokens'
import 'vs/workbench/contrib/codeEditor/browser/saveParticipants'
import 'vs/workbench/contrib/codeEditor/browser/toggleMinimap'
import 'vs/workbench/contrib/codeEditor/browser/toggleMultiCursorModifier'
import 'vs/workbench/contrib/codeEditor/browser/toggleRenderControlCharacter'
import 'vs/workbench/contrib/codeEditor/browser/toggleWordWrap'
import 'vs/workbench/contrib/codeEditor/browser/toggleRenderWhitespace'
import 'vs/workbench/contrib/codeEditor/browser/editorLineNumberMenu'
import 'vs/workbench/contrib/format/browser/format.contribution'
import 'vs/workbench/contrib/folding/browser/folding.contribution'
import 'vs/workbench/contrib/inlayHints/browser/inlayHintsAccessibilty'
import 'vs/workbench/contrib/codeActions/browser/codeActions.contribution'
import 'vs/workbench/contrib/list/browser/list.contribution'
import 'vs/workbench/contrib/codeEditor/browser/editorFeatures'
import 'vs/workbench/contrib/contextmenu/browser/contextmenu.contribution'
import 'vs/workbench/contrib/mappedEdits/common/mappedEdits.contribution'
import 'vs/workbench/browser/actions/textInputActions'
import 'vs/workbench/browser/actions/developerActions'

class ExtensionPoints implements IWorkbenchContribution {
  static readonly ID = 'workbench.contrib.extensionPoints.main'

  constructor (
    @IInstantiationService private readonly instantiationService: IInstantiationService
  ) {
    this.instantiationService.createInstance(JSONValidationExtensionPoint)
    this.instantiationService.createInstance(ColorExtensionPoint)
    this.instantiationService.createInstance(IconExtensionPoint)
  }
}
registerWorkbenchContribution2(ExtensionPoints.ID, ExtensionPoints, WorkbenchPhase.BlockStartup)
