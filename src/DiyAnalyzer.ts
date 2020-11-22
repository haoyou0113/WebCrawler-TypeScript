import { AnalyzerType } from './crowller'


export default class DiyAnalyzer implements AnalyzerType {

    public analyze(html: string, filePath: string) {
        return html
    }
}