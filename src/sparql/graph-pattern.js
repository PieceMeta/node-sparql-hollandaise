import Triple from './triple';

export default class GraphPattern {
    /**
     * The GraphPattern represents a list of Triples, Filters and Queries
     *
     * @class GraphPattern
     * @constructor
     * @param {Object|Array} elements - Initial item(s) for the GraphPattern
     * @param {Boolean} optional - Set the OPTIONAL flag (for use within GroupGraphPatterns)
     * @param {Boolean} union - Set the UNION flag (for use within GroupGraphPatterns)
     * @param {Array} allowedTypes - Override the default allowed types (Triple, Filter and Query)
     */
    constructor(elements, optional = false, union = false, allowedTypes = ['Triple', 'Filter', 'Query']) {
        this.clear();
        this._allowedTypes = allowedTypes;
        this._optional = optional;
        this._union = union;
        if (Array.isArray(elements)) {
            for (let element of elements) {
                this.addElement(element);
            }
        } else if (elements) {
            this.addElement(elements);
        }
    }

    /**
     * Adds an element to the pattern
     *
     * @method addElement
     * @param {Object|String} element - Single item to add
     * @param {number} atIndex - Optional index for the added element (default is end of list)
     */
    addElement(element, atIndex = -1) {
        if (typeof element === 'string') {
            element = new Triple(element);
        }
        if (this._allowedTypes.indexOf(element.constructor.name) > -1) {
            this._elements.splice(atIndex < 0 ? this.countElements() : atIndex, 0, element);
        } else {
            throw new Error(`TypeError: Element of type ${element.constructor.name || typeof element} is not allowed for this block.`);
        }
    }

    /**
     * Removes one or more elements from the pattern
     *
     * @method removeElements
     * @param {number} atIndex - Index of item to remove (default is first)
     * @param {number} count - Number of elements to remove (default is 1)
     */
    removeElements(atIndex = 0, count = 1) {
        if (atIndex >= 0 && atIndex + count <= this.countElements()) {
            this._elements.splice(atIndex, count);
        } else {
            throw new Error('OutOfBounds: Cannot remove elements from block, index and/or count out of bounds.');
        }
    }

    /**
     * Retrieves the elements from the pattern
     *
     * @method getElements
     * @returns {Array}
     */
    getElements() {
        return this._elements;
    }

    /**
     * Get the element count
     *
     * @method countElements
     * @returns {Number}
     */
    countElements() {
        return this._elements.length;
    }

    /**
     * Clear the pattern
     *
     * @method clear
     */
    clear() {
        this._elements = [];
    }

    /**
     * Retrieves the SPARQL string representation of the current instance
     *
     * @method toString
     * @returns {String}
     */
    toString() {
        var result = `${this._optional ? 'OPTIONAL ' : ''}${this._union ? 'UNION ' : ''}{ `;
        for (let element of this._elements) {
            if (element.constructor.name === 'Query') {
                result += `{ ${element.toString(true)} } `;
            } else {
                result += `${element.toString()}${this._elements.length > 1 && element instanceof Triple ? ' . ' : ' '}`;
            }
        }
        result += '}';
        return result;
    }
}